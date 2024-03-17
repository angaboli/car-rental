import { createBooking, checkCarAvailability } from "@/services";
import { useEffect, useState } from "react";
import InputDateTime from "./inputDateTime";
import { Input, Select, Option, Switch, Tooltip, Chip } from "@material-tailwind/react";
import ButtonMain from'@/components/buttonMain';
import { useRouter } from 'next/router';

interface FormErrors {
  pickUpLocation?: string;
  dropOffLocation?: string;
  pickUpDate?: string;
  pickUpTime?: string;
  dropOffDate?: string;
  dropOffTime?: string;
  firstName?: string;
  lastName?: string;
  emailAdress?: string;
  phoneNumber?: string;
  whatsAppNumber?: string;
  finalPrice?: string;
  withDriver?: boolean;
  outCapital?: boolean;
}

interface AvailabilityState {
  loading: boolean;
  error: Error | null;
  isAvailable: boolean;
}


interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Form = ({ car }: any) => {
  const router = useRouter();
  const nextHourDate = getNextHour();
  const formattedDate = formatDate(nextHourDate); // YYYY-MM-DD
  const formattedTime = formatTime(nextHourDate); // HH:MM
  const [ finalPrice, setFinalPrice ] = useState(car?.price)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
    carId: car?.id,
    finalPrice: finalPrice,
    withDriver: false,
    outCapital: false,
  })
  const [withDriver, setWithDriver] = useState(false);
  const [outCapital, setOutCapital] = useState(false);
  const [addDropoff, setAddDropoff] = useState(false)
  const [nextIsValid, setNextIsValid ] = useState(false)
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [availability, setAvailability] = useState<AvailabilityState>({
    loading: true,
    error: null,
    isAvailable: false,
  });
  const carId = car?.id;
  const [ rentWithDriver, setRentWithDriver ] = useState(false);

   const handleCloseModal = () => {
    setIsModalOpen(false); // Ferme la modal
    router.push('/'); // Redirige vers la page d'accueil
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const updatePrice = (e: any) => {
    if(e.target.name == "withDriver") {
      setWithDriver(e.target.checked)
    } else if(e.target.name == "outCapital") {
      setOutCapital(e.target.checked)
    }
  }

  const updatedropOffLocation = (e:any)  => {
     if(e.target.name == "returnAgency") {
      setAddDropoff(e.target.checked)
    }
  }

  useEffect(() => {
    const startDate = new Date(formValue.pickUpDate);
    const endDate = new Date(formValue.dropOffDate);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let price = car?.price * daysDiff;

    if (withDriver || car?.withDriver) {
      price += 5000 * daysDiff;
      formValue.withDriver = true;
    }
    if (outCapital) {
      price += 10000 * daysDiff;
      formValue.outCapital = true;
    }
    setFinalPrice(price);
    setFormValue({ ...formValue, finalPrice: price });
  }, [withDriver, outCapital, car?.price, formValue.pickUpDate, formValue.dropOffDate]);

  // Fonction de validation pour l'étape 1
  const validateStep1 = () => {
    const errors: any = {};
    // Validation du lieu de récupération
    if (!formValue.pickUpLocation) errors.pickUpLocation = 'Le lieu de récupération est requis';
    // Validation conditionnelle du lieu de retour
    else if (addDropoff && !formValue.dropOffLocation) errors.dropOffLocation = 'Le lieu de retour est requis lorsque cette option est sélectionnée';
    // Ajouter d'autres validations pour l'étape 1 si nécessaire
    else setNextIsValid(true);
    return errors;
  };

  // Fonction de validation pour l'étape 2
  const validateStep2 = () => {
    const errors: any = {};
    if (!formValue.firstName) errors.firstName = 'Le prénom est requis';
    if (!formValue.lastName) errors.lastName = 'Le nom est requis';
    return errors;
  };

 // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(formValue)
    const resp = await createBooking(formValue);
    console.log(resp);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      const result = await checkCarAvailability(formValue.pickUpDate, formValue.dropOffDate);
      setAvailability(result);
    };

    fetchAvailability();
  }, [carId, formValue.pickUpDate, formValue.dropOffDate]);

  // Gérer les changements de champ et valider en temps réel
  const handleChange = (event: any | string, name?: any ) => {
    let fieldName: any = name;
    //let fieldValue = event;
    let value: string;

    if (typeof event === 'object' && event.target) {
      fieldName = event.target.name;
      value = event.target.value;
    }else{
      value = event;
    }
    //const { name, value } = event.target;
    setFormValue(prevState => ({ ...prevState, [fieldName]: value }));

    // Optionnel: Valider à la modification pour une rétroaction instantanée
    setErrors((prevErrors: FormErrors) => {
      const error = validateStep2();
      //const error = validateField(name, value); // Supposez que cette fonction renvoie un message d'erreur ou null
      return { ...prevErrors, [name]: error };
    });
  };

  const validateDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignore time part

    const pickUpDate = new Date(formValue.pickUpDate);
    const dropOffDate = new Date(formValue.dropOffDate);

    if (pickUpDate < today) {
      return "La date de récupération ne peut pas être dans le passé.";
    }

    if (dropOffDate < today) {
      return "La date de retour ne peut pas être dans le passé.";
    }

    if (dropOffDate < pickUpDate) {
      return "La date de retour ne peut pas être avant la date de récupération.";
    }
    return null; // Pas d'erreur
  }

  const validateTimes = () => {
    const now = new Date();
    const pickUpDate = new Date(formValue.pickUpDate + "T" + formValue.pickUpTime);
    const dropOffDate = new Date(formValue.dropOffDate + "T" + formValue.dropOffTime);

    // Si la date de récupération est aujourd'hui, vérifiez l'heure
    if (pickUpDate.toDateString() === now.toDateString() && pickUpDate <= now) {
      return "L'heure de récupération doit être au moins l'heure suivante.";
    }

    // Si les dates de récupération et de retour sont les mêmes, l'heure de retour doit être supérieure à l'heure de récupération
    if (formValue.pickUpDate === formValue.dropOffDate && dropOffDate <= pickUpDate) {
      return "L'heure de retour doit être après l'heure de récupération.";
    }
    return null; // Pas d'erreur
  }

  useEffect(() => {
    const step1Errors = validateStep1();
    const dateError = validateDates();
    const timeError = validateTimes();

    const newErrors = { ...step1Errors };

    if (dateError) newErrors.pickUpDate = dateError;
    if (timeError) newErrors.pickUpTime = timeError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }
    // Ajoutez ici toutes les variables / états dont dépend cette logique
  }, [formValue.pickUpDate, formValue.pickUpTime, formValue.dropOffDate, formValue.dropOffTime, addDropoff]);

  return (
    <>
    <form method="" onSubmit={handleSubmit} className="w-11/12 max-w-7xl bg-light-gray mb-3">
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
            <InputDateTime label="Date de récuperation" nameDate="pickUpDate" nameTime="pickUpTime" valueDate={formValue.pickUpDate} valueTime={formValue.pickUpTime} onChange={handleChange} className="" />
            <InputDateTime label="Date de retour" nameDate="dropOffDate" nameTime="dropOffTime" valueDate={formValue.dropOffDate} valueTime={formValue.dropOffTime} onChange={handleChange} className="" />
          </div>
          <div className="flex flex-row w-full mb-5 gap-10">
            <div>
            <Switch label='Avec chauffeur&nbsp;?' name="withDriver" onChange={updatePrice} checked={rentWithDriver} disabled={car?.withDriver}  containerProps={{ className: "my-5", }} crossOrigin=""  />
              {
                car?.withDriver &&
                <sup>
                  <Tooltip content='Location avec chauffeur obligatoire.'>
                    <button className="italic text-primary-black ml-3">i</button>
                  </Tooltip>
                </sup>
              }
              </div>
            <Switch label="Hors Abidjan&nbsp;?" name="outCapital" onChange={updatePrice} containerProps={{ className: "my-5", }} crossOrigin="" />
            {/* <ToggleCheck label="Avec chauffeur ?" name="withDriver" type="checkbox" onChange={updatePrice} className="w-1/2" />
            <ToggleCheck label="Heure de retour" name="outCapital" type="checkbox" onChange={updatePrice} className="w-1/2" /> */}
          </div>
          <div className="flex">
            {
              (finalPrice !== 0 && !isNaN(finalPrice)) &&
              <FinalPrice price={finalPrice} />
            }
          </div>
        </div>
      </div>
      <div className="shadow-md rounded-3xl p-5 text-primary-black">
        <h3 className="font-bold text-gold text-xl mb-3">Vos Coordonnées</h3>
        <div>
          <div className="flex flex-col sm:flex-row w-full mb-5 gap-5">
            <Input className="" label="Votre Prénom"  type='text' name="firstName" value={formValue.firstName} onChange={handleChange} crossOrigin=""  />
            <Input className="" label="Votre Nom"  type='text' name="lastName" value={formValue.lastName} onChange={handleChange} crossOrigin=""  />
          </div>
          <div className="flex flex-col sm:flex-row w-full mb-5 gap-5">
            <Input label="Numéro de tél"  type='tel' name="phoneNumber" value={formValue.phoneNumber} onChange={handleChange} crossOrigin=""  />
            <Input label="Numéro de WhatsApp"  type='tel' name="whatsAppNumber" value={formValue.whatsAppNumber} onChange={handleChange} crossOrigin=""  />
          </div>
          <div className="flex flex-col sm:flex-row w-full mb-5 gap-5">
            <Input label="Votre email"  type='email' name="emailAdress" value={formValue.emailAdress} onChange={handleChange} crossOrigin=""  />
            <Select label="Votre age" name="age" onChange={(value) => handleChange(value, 'age')} defaultValue={formValue.age}  placeholder="Votre age"  >
              <Option value="21-24">21-24</Option>
              <Option value="25-29">25-29</Option>
              <Option value="30+">30+</Option>
            </Select>
          </div>
          <div className='flex flex-wrap justify-between my-3'>
            {
              (finalPrice !== 0 && !isNaN(finalPrice)) &&
              <FinalPrice price={finalPrice} />
            }
            <ButtonMain type="submit" label='Je valide'  className='px-8' />
          </div>
        </div>
      </div>
      <div>
      </div>
      </div>
    </form>
    <ReservationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

const ReservationModal : React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
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
  <div className="">
    <Chip
      variant="ghost"
      value={
        <div>
          <span className="font-semibold text-2xl">{
            new Intl.NumberFormat('fr-CI', { style: 'currency', currency: 'CFA' }).format( price) }&nbsp;
          </span>
          <span className="font-12px lowercase">/jr</span>
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


/*
const validatepickUpDate = (date) => {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  if (date < today) {
    setError("La date de récupération doit être aujourd'hui ou dans le futur.");
    return false;
  }
  setError("");
  return true;
};

const validatepickUpTime = (time) => {
  if (pickUpDate === new Date().toISOString().split('T')[0]) {
    const now = new Date();
    const oneHourLater = getOneHourLater(now);
    const pickUpDateTime = new Date(pickUpDate + "T" + time);
    if (pickUpDateTime < oneHourLater) {
      setError("L'heure de récupération doit être au moins une heure après l'heure actuelle.");
      return false;
    }
  }
  setError("");
  return true;
};

const validatedropOffDate = (date) => {
  if (date < pickUpDate) {
    setError("La date de retour doit être après la date de récupération.");
    return false;
  }
  setError("");
  return true;
};

const validatedropOffTime = (time) => {
  if (dropOffDate === pickUpDate) {
    const pickUpDateTime = new Date(pickUpDate + "T" + pickUpTime);
    const dropOffDateTime = new Date(dropOffDate + "T" + time);
    if (dropOffDateTime <= getOneHourLater(pickUpDateTime)) {
      setError("L'heure de retour doit être au moins une heure après l'heure de récupération pour le même jour.");
      return false;
    }
  }
  setError("");
  return true;
};
   */
export default Form