import { createBooking, checkCarAvailability } from "@/services";
import { useEffect, useState, useMemo, useRef } from "react";
import InputField from "./inputField";
import SelectField from "./selectField";
import ToggleCheck from "./toggleCheck";
import InputDateTime from "./inputDateTime";
import { CiLocationOn } from "react-icons/ci";
import { Input, Select, Option, Switch, Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import { MdOutlineCarRental } from "react-icons/md";

interface FormErrors {
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  pickupTime?: string;
  dropoffDate?: string;
  dropoffTime?: string;
  firstName?: string;
  lastName?: string;
  emailAdress?: string;
  phoneNumber?: string;
  whatsAppNumber?: string;
}

const Form = ({ car }: any) => {
  const nextHourDate = getNextHour();
  const formattedDate = formatDate(nextHourDate); // YYYY-MM-DD
  const formattedTime = formatTime(nextHourDate); // HH:MM
  const [ finalPrice, setFinalPrice ] = useState(car?.price)
  const [formValue, setFormValue] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: formattedDate,
    dropoffDate: formattedDate,
    pickupTime: formattedTime,
    dropoffTime: "20:00",
    firstName: '',
    lastName: '',
    emailAdress: '',
    age: '30+',
    phoneNumber: '',
    whatsAppNumber: '',
    carId: car?.id,
    bookingPrice: finalPrice
  })
  const [withDriver, setWithDriver] = useState(false);
  const [outCapital, setOutCapital] = useState(false);
  const [addDropoff, setAddDropoff] = useState(false)
  const [nextIsValid, setNextIsValid ] = useState(false)
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [availability, setAvailability] = useState({
    loading: true,
    error: null,
    isAvailable: false,
  });
  const carId = car?.id

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

  const updateDropoffLocation = (e:any)  => {
     if(e.target.name == "returnAgency") {
      setAddDropoff(e.target.checked)
    }
  }

  useEffect(() => {
    let price = car?.price;
    if(withDriver) { price += 5000}
    if(outCapital) { price += 10000}
    setFinalPrice(price);
  }, [withDriver, outCapital, car?.price])
  useEffect(() => {
    if (car) setFormValue({ ...formValue, carId: car.id, bookingPrice: finalPrice });
  }, [car])

  // Fonction de validation pour l'étape 1
  const validateStep1 = () => {
    const errors: any = {};
    // Validation du lieu de récupération
    if (!formValue.pickupLocation) errors.pickupLocation = 'Le lieu de récupération est requis';
    // Validation conditionnelle du lieu de retour
    else if (addDropoff && !formValue.dropoffLocation) errors.dropoffLocation = 'Le lieu de retour est requis lorsque cette option est sélectionnée';
    // Ajouter d'autres validations pour l'étape 1 si nécessaire
    else setNextIsValid(true);
    return errors;
  };

  // Fonction de validation pour l'étape 2
  const validateStep2 = () => {
    const errors: any = {};
    // Validation du prénom
    if (!formValue.firstName) errors.firstName = 'Le prénom est requis';
    // Validation du nom
    if (!formValue.lastName) errors.lastName = 'Le nom est requis';
    // Ajouter d'autres validations pour l'étape 2 si nécessaire
    return errors;
  };

  // Fonction pour passer à l'étape suivante
/* const nextStep = () => {
  let valid = true;
  if (step === 1) {
    const step1Errors = validateStep1();
    valid = Object.keys(step1Errors).length === 0;
    setErrors(step1Errors); // Mettez à jour l'état des erreurs ici
  }

  if (valid) setStep(currentStep => currentStep + 1);
}; */


 // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Valider l'étape 2 lors de la soumission du formulaire
    const step2Errors = validateStep2();
    if (Object.keys(step2Errors).length === 0) {
      console.log('Form is valid, submitting...', formValue);
      // Logique de soumission ici
    } else {
      setErrors(step2Errors); // Afficher les erreurs de l'étape 2
    }
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      const result = await checkCarAvailability(carId, formValue.pickupDate, formValue.dropoffDate);
      setAvailability(result);
    };

    fetchAvailability();
  }, [carId, formValue.pickupDate, formValue.dropoffDate]);

  // Gérer les changements de champ et valider en temps réel
  const handleChange = (event: any | string, name?: string ) => {
    let fieldName = name;
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

    const pickupDate = new Date(formValue.pickupDate);
    const dropoffDate = new Date(formValue.dropoffDate);

    if (pickupDate < today) {
      return "La date de récupération ne peut pas être dans le passé.";
    }

    if (dropoffDate < today) {
      return "La date de retour ne peut pas être dans le passé.";
    }

    if (dropoffDate < pickupDate) {
      return "La date de retour ne peut pas être avant la date de récupération.";
    }
    return null; // Pas d'erreur
  }

  const validateTimes = () => {
    const now = new Date();
    const pickupDate = new Date(formValue.pickupDate + "T" + formValue.pickupTime);
    const dropoffDate = new Date(formValue.dropoffDate + "T" + formValue.dropoffTime);

    // Si la date de récupération est aujourd'hui, vérifiez l'heure
    if (pickupDate.toDateString() === now.toDateString() && pickupDate <= now) {
      return "L'heure de récupération doit être au moins l'heure suivante.";
    }

    // Si les dates de récupération et de retour sont les mêmes, l'heure de retour doit être supérieure à l'heure de récupération
    if (formValue.pickupDate === formValue.dropoffDate && dropoffDate <= pickupDate) {
      return "L'heure de retour doit être après l'heure de récupération.";
    }
    return null; // Pas d'erreur
  }

  useEffect(() => {
    const step1Errors = validateStep1();
    const dateError = validateDates();
    const timeError = validateTimes();

    const newErrors = { ...step1Errors };

    if (dateError) newErrors.pickupDate = dateError;
    if (timeError) newErrors.pickupTime = timeError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }
    // Ajoutez ici toutes les variables / états dont dépend cette logique
  }, [formValue.pickupDate, formValue.pickupTime, formValue.dropoffDate, formValue.dropoffTime, addDropoff]);

  return (
    <form method=""  className="w-11/12 max-w-7xl bg-light-gray mb-3">
      <div>
        <div className="shadow-md rounded-3xl p-5 my-3">
          <h3 className="font-bold text-blue-green text-xl mb-3">Votre réservation</h3>
          <div>
            <Select className="" placeholder="Lieu de récuperation ?" label="Lieu de récuperation ?" name="pickupLocation" onChange={(value) => handleChange(value, 'pickupLocation')} defaultValue={formValue.pickupLocation} color="teal" >
              <Option value="Riviéra M'badon, Abidjan">Riviéra M'badon, Abidjan</Option>
              <Option value="Aéroport Félix Houphouet Boigny, Abidjan">Aéroport Félix Houphouet Boigny, Abidjan</Option>
            </Select>
            <Switch label="Retour dans une autre agence&nbsp;?" name="returnAgency" onChange={updateDropoffLocation} color="teal" containerProps={{ className: "my-5", }}  />
            {/* <ToggleCheck label="Retour dans une autre agence&nbsp;?" name="returnAgency" type="checkbox" onChange={updateDropoffLocation} className="w-1/2 mb-2" /> */}
            {
              addDropoff == true && (
                <Select className="" label="Lieu de retour ?" name="dropoffLocation" onChange={(value) => handleChange(value, 'dropoffLocation')} defaultValue={formValue.dropoffLocation} color="teal" >
                  <Option value="Riviéra M'badon, Abidjan">Riviéra M'badon, Abidjan</Option>
                  <Option value="Aéroport Félix Houphouet Boigny, Abidjan">Aéroport Félix Houphouet Boigny, Abidjan</Option>
                </Select>
            )}
          <div className="flex gap-5 mb-5">
            <InputDateTime label="Date de récuperation" nameDate="pickupDate" nameTime="pickupTime" valueDate={formValue.pickupDate} valueTime={formValue.pickupTime} onChange={handleChange} className="" />
            <InputDateTime label="Date de retour" nameDate="dropoffDate" nameTime="dropoffTime" valueDate={formValue.dropoffDate} valueTime={formValue.dropoffTime} onChange={handleChange} className="" />
          </div>
          <div className="flex flex-row w-full mb-5 gap-5">
            <Switch label="Avec chauffeur&nbsp;?" name="withDriver" onChange={updatePrice} color="teal" containerProps={{ className: "my-5", }}  />
            <Switch label="Hors Abidjan&nbsp;?" name="outCapital" onChange={updatePrice} color="teal" containerProps={{ className: "my-5", }} />
            {/* <ToggleCheck label="Avec chauffeur ?" name="withDriver" type="checkbox" onChange={updatePrice} className="w-1/2" />
            <ToggleCheck label="Heure de retour" name="outCapital" type="checkbox" onChange={updatePrice} className="w-1/2" /> */}
          </div>
          <FinalPrice price={finalPrice} />
        </div>
      </div>
      <div className="shadow-md rounded-3xl p-5 text-primary-black">
        <h3 className="font-bold text-blue-green text-xl mb-3">Vos Coordonnées</h3>
        <div>
          <div className="flex flex-row w-full mb-5 gap-5">
            <Input label="Votre Prénom" color="teal" type='text' name="firstName" value={formValue.firstName} onChange={handleChange} />
            <Input label="Votre Nom" color="teal" type='text' name="lastName" value={formValue.lastName} onChange={handleChange}  />
          </div>
          <div className="flex flex-row w-full mb-5 gap-5">
            <Input label="Numéro de tél" color="teal" type='tel' name="phoneNumber" value={formValue.phoneNumber} onChange={handleChange}  />

            <Input label="Numéro de WhatsApp" color="teal" type='tel' name="whatsAppNumber" value={formValue.whatsAppNumber} onChange={handleChange} />
          </div>
          <div className="flex flex-row w-full mb-5 gap-5">
            <Input label="Votre email" color="teal" type='email' name="emailAdress" value={formValue.emailAdress} onChange={handleChange} />
            <Select label="Votre age" name="age" onChange={(value) => handleChange(value, 'age')} defaultValue={formValue.age} color="teal" >
              <Option value="21-24">21-24</Option>
              <Option value="25-29">25-29</Option>
              <Option value="30+">30+</Option>
            </Select>
          </div>
          <FinalPrice price={ finalPrice } />
        </div>
      </div>
      <div>
          <button className="float-right w-40 group my-5 overflow-hidden btn_base py-2 px-3 rounded items-center flex gap-2 bg-gradient-to-r from-cyan-700 to-cyan-500  text-light-gray hover:text-light-orange hover:bg-primary-black hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
            <MdOutlineCarRental className="z-40 transition-all duration-300 group-hover:translate-x-1" />
            <span className="z-40">Je rèserve</span>
            <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
	          </div>
          </button>
      </div>
      </div>
    </form>
  )
}

const FinalPrice = ({ price }: { price: number }) => (
  <div className="mb-5">
    <p className="text-md text-gray-800 mt-0 kbd">
      <span className="font-semibold text-2xl">{
        new Intl.NumberFormat('fr-CI', { style: 'currency', currency: 'CFA' }).format( price) }&nbsp;
      </span>
      <span className="font-12px">/jr</span>
    </p>
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
  return date.toISOString().split('T')[1].slice(0, 5);
}


/*
const validatePickupDate = (date) => {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  if (date < today) {
    setError("La date de récupération doit être aujourd'hui ou dans le futur.");
    return false;
  }
  setError("");
  return true;
};

const validatePickupTime = (time) => {
  if (pickupDate === new Date().toISOString().split('T')[0]) {
    const now = new Date();
    const oneHourLater = getOneHourLater(now);
    const pickupDateTime = new Date(pickupDate + "T" + time);
    if (pickupDateTime < oneHourLater) {
      setError("L'heure de récupération doit être au moins une heure après l'heure actuelle.");
      return false;
    }
  }
  setError("");
  return true;
};

const validateDropoffDate = (date) => {
  if (date < pickupDate) {
    setError("La date de retour doit être après la date de récupération.");
    return false;
  }
  setError("");
  return true;
};

const validateDropoffTime = (time) => {
  if (dropoffDate === pickupDate) {
    const pickupDateTime = new Date(pickupDate + "T" + pickupTime);
    const dropoffDateTime = new Date(dropoffDate + "T" + time);
    if (dropoffDateTime <= getOneHourLater(pickupDateTime)) {
      setError("L'heure de retour doit être au moins une heure après l'heure de récupération pour le même jour.");
      return false;
    }
  }
  setError("");
  return true;
};
   */
export default Form