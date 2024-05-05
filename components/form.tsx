import { createBooking } from "@/services";
import { useEffect, useState } from "react";
import InputDateTime from "./inputDateTime";
import { Input, Select, Option, Switch, Tooltip, Chip } from "@material-tailwind/react";
import ButtonMain from '@/components/buttonMain';
import EmailReservation from '@/components/emailReservation';
import SkeletonPage from '@/components/SkeletonPage';
import { useRouter } from 'next/router';
import { BsInfoCircleFill } from "react-icons/bs";
import { EmailParams, FormErrors, AvailabilityState, FormValues, ReservationModalProps, FormValidators, ValidationParams } from '@/types';
import { validators } from '@/services/validation';


const Form = ({ car, loading, className }: any) => {
  const router = useRouter();
  const nextHourDate = getNextHour();
  const formattedDate = formatDate(nextHourDate); // YYYY-MM-DD
  const formattedTime = formatTime(nextHourDate); // HH:MM
  const [carId, setCarId] = useState("");
  const [finalPrice, setFinalPrice] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(loading);
  const [formValue, setFormValue] = useState({
    pickUpLocation: '',
    dropOffLocation: '',
    pickUpDate: formattedDate,
    dropOffDate: formattedDate,
    pickUpTime: formattedTime,
    dropOffTime: "20:00",
    firstName: '',
    lastName: '',
    emailAdress: '',
    age: '30+',
    phoneNumber: '',
    whatsAppNumber: '',
    carId: carId,
    finalPrice: finalPrice,
    withDriver: false,
    outCapital: false,
  })
  const [withDriver, setWithDriver] = useState(false);
  const [outCapital, setOutCapital] = useState(false);
  const [addDropoff, setAddDropoff] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [rentWithDriver, setRentWithDriver] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false); // Ferme la modal
    router.push('/'); // Redirige vers la page d'accueil
  };

  const updatePrice = (e: any) => {
    if (e.target.name == "withDriver") {
      setWithDriver(e.target.checked)
    } else if (e.target.name == "outCapital") {
      setOutCapital(e.target.checked)
    }
  }

  const updatedropOffLocation = (e: any) => {
    if (e.target.name == "returnAgency") {
      setAddDropoff(e.target.checked)
    }
  }

  useEffect(() => {
    if (car) {
      setCarId(car.id || "");
      setFinalPrice(car.carACF?.price || 0);
      setFormValue(prev => ({
        ...prev,
        carId: car.id || "",
        finalPrice: car.carACF?.price || 0
      }));
    }
  }, [car]);

  useEffect(() => {
    const savedFormData = sessionStorage.getItem("formData");
    if (savedFormData) {
      setFormValue(JSON.parse(savedFormData));
    } else {
      setFormValue({
        ...formValue,
        carId: car?.id,
        finalPrice: finalPrice,
      });
    }
  }, [car]);

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formValue));
  }, [formValue]);

  useEffect(() => {
    const startDate = new Date(formValue.pickUpDate);
    const endDate = new Date(formValue.dropOffDate);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = (Math.ceil(timeDiff / (1000 * 3600 * 24))) + 1;

    let price = car?.carACF?.price * daysDiff;
    if (withDriver || car?.carACF?.withDriver) {
      price += 5000 * daysDiff;
      formValue.withDriver = true;
      setRentWithDriver(true);
    }
    if (outCapital) {
      price += 10000 * daysDiff;
      formValue.outCapital = true;
    }
    setFinalPrice(price);
    setFormValue({ ...formValue, finalPrice: price });
  }, [withDriver, rentWithDriver, outCapital, car?.price, formValue.pickUpDate, formValue.dropOffDate]);


  const validateForm = (values: FormValues): any => {
    let newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(values).forEach(key => {
      const validator = validators[key as keyof typeof validators];
      if (validator) {
        let error;
        // Exemple d'utilisation des validateurs avec plusieurs paramètres
        switch (key) {
          case 'pickUpDate':
            error = validator(values.pickUpDate);
            break;
          case 'dropOffDate':
            error = validator(values.dropOffDate, values.pickUpDate);
            break;
          case 'pickUpTime':
            error = validator(values.pickUpTime, values.pickUpDate);
            break;
          case 'dropOffTime':
            error = validator(values.dropOffTime, values.pickUpTime, values.pickUpDate, values.dropOffDate);
            break;
          default:
            error = validator(values[key] as any);
            break;
        }
        if (error) {
          newErrors[key] = error;
          //isValid = false;
        }
      }
    });

    setErrors(newErrors);
    console.log("errors : ", errors);

    return newErrors;
  };


  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Réinitialisation des erreurs
    let newErrors: FormErrors = {};

    let validateFormValues = validateForm(formValue);
    console.log(validateFormValues)
    // Vérification des validations des champs
    if (Object.keys(validateFormValues).length !== 0) {
      console.error('Validation errors', errors);
      setErrors(newErrors);
      return; // Stop the submission if there are errors
    }

    // Mise à jour de l'état des erreurs
    setErrors(newErrors);

    // Vérifiez s'il y a des erreurs avant de continuer
    if (Object.values(newErrors).some(error => error !== null)) {
      console.error("Erreurs de validation, soumission annulée.");
      return;
    }
    const currentCarId = carId || car?.id;

    // Création de la reservation !
    try {
      const formSubmission = {
        ...formValue,
        carId: currentCarId,
      };

      console.log("Submitting with car ID: ", currentCarId);
      const response = await createBooking(formSubmission);
      console.log("Réservation créée avec succès", response);
      setIsModalOpen(true);
      sessionStorage.removeItem("formData");
    } catch (error) {
      console.error("Erreur lors de la création de la réservation :", error);
    }
  };



  // Gestion des changements de champ et validation en temps réel
  const handleChange = (event: any | string, name?: any) => {
    let fieldName: any = name;
    let value: string;

    if (typeof event === 'object' && event.target) {
      fieldName = event.target.name;
      value = event.target.value;
    } else {
      value = event;
    }

    // Mise à jour de la valeur du champ
    setFormValue(prevState => ({ ...prevState, [fieldName]: value }));
    validateForm({ ...formValue, [fieldName]: value });
  }

  return (
    <>
      {
        (isLoading) ?
          <div className="max-w-7xl bg-light-gray">
            <SkeletonPage />
          </div> :
          <>
            <form method="" onSubmit={handleSubmit} className={`${className} max-w-7xl bg-light-gray mb-3`}>
              <div>
                <div className="shadow-md rounded-3xl p-5 my-3">
                  <h3 className="font-bold text-gold text-xl mb-3">Votre réservation</h3>
                  <div>
                    <Select className="" placeholder="Lieu de récuperation ?" label="Lieu de récuperation ?" name="pickUpLocation" onChange={(value) => handleChange(value, 'pickUpLocation')} defaultValue={formValue.pickUpLocation} >
                      <Option value="Riviéra M'badon, Abidjan">Riviéra M'badon, Abidjan</Option>
                      <Option value="Aéroport Félix Houphouet Boigny, Abidjan">Aéroport Félix Houphouet Boigny, Abidjan</Option>
                    </Select>
                    <Switch label="Retour dans une autre agence&nbsp;?" name="returnAgency" onChange={updatedropOffLocation} containerProps={{ className: "my-5", }} crossOrigin="" />
                    {/* <ToggleCheck label="Retour dans une autre agence&nbsp;?" name="returnAgency" type="checkbox" onChange={updatedropOffLocation} className="w-1/2 mb-2" /> */}
                    {
                      addDropoff == true && (
                        <Select className="" label="Lieu de retour ?" name="dropOffLocation" onChange={(value) => handleChange(value, 'dropOffLocation')} defaultValue={formValue.dropOffLocation} placeholder="Lieu de retour ?">
                          <Option value="Riviéra M'badon, Abidjan">Riviéra M'badon, Abidjan</Option>
                          <Option value="Aéroport Félix Houphouet Boigny, Abidjan">Aéroport Félix Houphouet Boigny, Abidjan</Option>
                        </Select>
                      )}
                    <div className="flex flex-col md:flex-row gap-5 mb-5">
                      <InputDateTime label="Date de récuperation" nameDate="pickUpDate" nameTime="pickUpTime" valueDate={formValue.pickUpDate} valueTime={formValue.pickUpTime} onChange={handleChange} className="" errors={errors.pickUpDate} />
                      <InputDateTime label="Date de retour" nameDate="dropOffDate" nameTime="dropOffTime" valueDate={formValue.dropOffDate} valueTime={formValue.dropOffTime} onChange={handleChange} className="" errors={errors.dropOffDate} />
                    </div>
                    <div className="flex flex-col sm:flex-row w-full mb-5 sm:gap-10">
                      <div className="flex">
                        <Switch label='Avec chauffeur&nbsp;?' color="brown" name="withDriver" onChange={updatePrice} checked={rentWithDriver} disabled={car?.carACF?.withDriver} containerProps={{ className: "my-5", }} crossOrigin="" />
                        {
                          car?.carACF?.withDriver &&
                          <Tooltip className="" content='Location avec chauffeur obligatoire.'>
                            <button>
                              <sup>
                                <BsInfoCircleFill className="text-gold text-xl ml-3 cursor-none" />
                              </sup>
                            </button>
                          </Tooltip>
                        }
                      </div>
                      <Switch label="Hors Abidjan&nbsp;?" color="brown" name="outCapital" onChange={updatePrice} containerProps={{ className: "my-5", }} crossOrigin="" />
                    </div>
                    <div className="flex">
                      {
                        !isNaN(finalPrice) && <FinalPrice price={finalPrice} />
                      }
                    </div>
                  </div>
                </div>
                <div className="shadow-md rounded-3xl p-5 text-primary-black">
                  <h3 className="font-bold text-gold text-xl mb-3">Vos Coordonnées</h3>
                  <div>
                    <div className="flex flex-col sm:flex-row w-full mb-5 gap-5">
                      <div className='flex flex-col w-full sm:w-1/2'>
                        <Input className="" label="Votre Prénom" type='text' name="firstName" value={formValue.firstName} onChange={handleChange} crossOrigin="" />
                        {errors.firstName && <div className=" text-red-500">{errors.firstName}</div>}
                      </div>
                      <div className='flex flex-col w-full sm:w-1/2'>
                        <Input className="" label="Votre Nom" type='text' name="lastName" value={formValue.lastName} onChange={handleChange} crossOrigin="" />
                        {errors.lastName && <div className="error text-red-500">{errors.lastName}</div>}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full mb-5 gap-5">
                      <div className='flex flex-col w-full sm:w-1/2'>
                        <Input label="Numéro de tél" type='tel' name="phoneNumber" value={formValue.phoneNumber} onChange={handleChange} crossOrigin="" />
                        {errors.phoneNumber && <div className="error text-red-500">{errors.phoneNumber}</div>}
                      </div>
                      <div className='flex flex-col w-full sm:w-1/2'>
                        <Input label="Numéro de WhatsApp" type='tel' name="whatsAppNumber" value={formValue.whatsAppNumber} onChange={handleChange} crossOrigin="" />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full mb-5 gap-5">
                      <Input label="Votre email" type='email' name="emailAdress" value={formValue.emailAdress} onChange={handleChange} crossOrigin="" />
                      <Select label="Votre age" name="age" onChange={(value) => handleChange(value, 'age')} defaultValue={formValue.age} placeholder="Votre age"  >
                        <Option value="21-24">21-24</Option>
                        <Option value="25-29">25-29</Option>
                        <Option value="30+">30+</Option>
                      </Select>
                    </div>
                    <div className='flex flex-wrap justify-between my-3 gap-5'>
                      {
                        !isNaN(finalPrice) && <FinalPrice price={finalPrice} />
                      }
                      <ButtonMain type="submit" label='Je valide' className='px-8' />
                    </div>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </form>
            <ReservationModal isOpen={isModalOpen} onClose={handleCloseModal} />
          </>
      }
    </>
  )
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative m-4 w-1/4 min-w-[25%] max-w-[25%] rounded-lg bg-white leading-relaxed text-primary-black antialiased shadow-2xl">
        <div
          className="flex items-center p-4 text-2xl leading-snug shrink-0 font-light text-gold">Votre réservation
        </div>
        <p className="relative p-4 leading-relaxed border-t border-b border-t-tacha-100 border-b-tacha-100 ">
          Votre réservation a été pris en compte, nous reviendrons vers vous dans les plus brefs delais.
        </p>
        <div className="flex justify-end text-center">
          <button className="btn_base primary_btn m-2 rounded-lg" onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

const FinalPrice = ({ price }: { price: number }) => (
  <div className=''>
    <Chip
      variant="ghost"
      value={
        <div>
          <span className="font-12px capitalize text-gold">Total&nbsp;:&nbsp;</span>
          <span className="font-semibold text-2xl">{
            new Intl.NumberFormat('fr-CI', { style: 'currency', currency: 'CFA' }).format(price)}&nbsp;
          </span>
        </div>
      }
    />
  </div>
)

// Fonction pour recuperer un heure après
function getNextHour() {
  const now = new Date();
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setHours(now.getHours() + 1);
  return now;
}

// Fonction pour formater une date en format YYYY-MM-DD
function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

// Fonction pour formater une date en format HH:MM
function formatTime(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // Retournez la chaîne de caractères formatée en HH:MM
  return `${formattedHours}:${formattedMinutes}`;
}

const sendEmail = async ({ firstName, contactEmail, contactPhone, pickUpLocation, dropOffLocation, pickUpDate, pickUpTime, dropOffDate, dropOffTime, finalPrice }: EmailParams) => {
  const html = <EmailReservation
    firstName={firstName}
    contactEmail={contactEmail}
    contactPhone={contactPhone}
    pickUpLocation={pickUpLocation}
    dropOffLocation={dropOffLocation}
    pickUpDate={pickUpDate}
    pickUpTime={pickUpTime}
    dropOffDate={dropOffDate}
    dropOffTime={dropOffTime}
    finalPrice={finalPrice}
  />
  const response = await fetch('/services/sendEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: contactEmail,
      subject: 'Confirmation de réception de votre réservation',
      message: html,
    }),
  });
  const data = await response.json();
  if (data.success) {
    console.log('Email envoyé avec succès');
  } else {
    console.error('Erreur lors de l\'envoi de l\'email', data.error);
  }
};

function validateDate(date: string, referenceDate?: string): string | undefined {
  if (!date) return "La date est obligatoire";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const inputDate = new Date(date);
  if (inputDate < today) return "La date ne peut pas etre dans le passer";

  if (referenceDate) {
    const reference = new Date(referenceDate);
    if (inputDate < reference) return "La date de retour ne doit pas être avant la date de récuperation";
  }
  return undefined;
}

function validateTime(time: string): string | undefined {
  if (!time) return "L'heure est obligatoire";
  return undefined;
}

export default Form