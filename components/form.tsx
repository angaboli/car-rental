import { createBooking } from "@/services";
import { useEffect, useState } from "react";
import InputField from "./inputField";
import SelectField from "./selectField";
import ToggleCheck from "./toggleCheck";
import InputDateTime from "./inputDateTime";
import { CiLocationOn } from "react-icons/ci";

const Form = ({ car }: any) => {
  const nextHourDate = getNextHour();
  const formattedDate = formatDate(nextHourDate); // YYYY-MM-DD
  const formattedTime = formatTime(nextHourDate); // HH:MM
  const [ finalPrice, setFinalPrice ] = useState(car.price)
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
    carId: car.id,
    bookingPrice: finalPrice
  })
  const [withDriver, setWithDriver] = useState(false);
  const [outCapital, setOutCapital] = useState(false);
  const [addDropoff, setAddDropoff] = useState(false)
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<any>({});

  /* useEffect(() => {


    setFormValue(prevState => ({
      ...prevState,
      pickupDate: formattedDate,
      pickupTime: formattedTime,
      dropoffDate: formattedDate,
      dropoffTime: "20:00"
    }));
  }, []); */

  /* const nextStep = () => {
    setStep(step + 1);
  }; */

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
    let price = car.price;
    if(withDriver) { price += 5000}
    if(outCapital) { price += 10000}
    setFinalPrice(price);
  }, [withDriver, outCapital, car.price])
  useEffect(() => {
    if (car) setFormValue({ ...formValue, carId: car.id, bookingPrice: finalPrice });
  }, [car])

  // Fonction de validation pour l'étape 1
  const validateStep1 = () => {
    const errors: any = {};
    // Validation du lieu de récupération
    if (!formValue.pickupLocation) errors.pickupLocation = 'Le lieu de récupération est requis';
    // Validation conditionnelle du lieu de retour
    if (addDropoff && !formValue.dropoffLocation) errors.dropoffLocation = 'Le lieu de retour est requis lorsque cette option est sélectionnée';
    // Ajouter d'autres validations pour l'étape 1 si nécessaire
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
  const nextStep = () => {
    // Si nous sommes à l'étape 1, valider avant de passer à l'étape 2
    if (step === 1) {
      const step1Errors = validateStep1();
      if (Object.keys(step1Errors).length === 0) {
        setStep(step + 1); // Aucune erreur, passer à l'étape suivante
      } else {
        setErrors(step1Errors); // Afficher les erreurs de l'étape 1
      }
    } else {
      // Si nécessaire, ajoutez ici la logique pour gérer d'autres transitions d'étapes
    }
  };

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

/*
  const validateField = (name: string, value: any) => {
    let errorMsg = null;
    switch (name) {
      case 'pickupLocation':
        if (!value) errorMsg = 'Le lieu de récupération est requis';
        break;
      case 'dropoffLocation':
        // Valider seulement si returnAgency (ajout de dropoff est coché)
        if (addDropoff && !value) errorMsg = 'Le lieu de retour est requis';
        break;
      case 'emailAdress':
        if (!value) {
          errorMsg = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = 'L\'email n\'est pas valide';
        }
        break;
      // Ajoutez ici les validations pour d'autres champs
      case 'firstName':
        if (!value) errorMsg = 'Le prénom est requis';
        break;
      case 'lastName':
        if (!value) errorMsg = 'Le nom est requis';
        break;
      // Vous pouvez ajouter plus de cas pour d'autres champs selon vos besoins
    }
    return errorMsg;
  }; */

  // Gérer les changements de champ et valider en temps réel
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValue(prevState => ({ ...prevState, [name]: value }));

    // Optionnel: Valider à la modification pour une rétroaction instantanée
    const error = validateStep2();
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

/*   // Valider tous les champs à la soumission
  const handleSubmit = async (event:any) => {
    event.preventDefault();

    // Valider tous les champs avant la soumission
    const newErrors: any = {};
    Object.keys(formValue).forEach(key => {
      const error = validateField(key, formValue[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      console.log('Form is valid, submitting...', formValue);
      // Logique de soumission ici
    } else {
      console.log('Validation errors', newErrors);
      setErrors(newErrors);
    }
  }; */

  return (
    <div>
      {
        step === 1 && (
          <div>
            <SelectField
              label="Lieu de récuperation ?"
              name="pickupLocation"
              onChange={handleChange}
              options={[
                { value: "Riviéra M'badon, Abidjan" },
                { value: "Aéroport Félix Houphouet Boigny, Abidjan" },
              ]}
              defaultValue=""
              Icon={CiLocationOn}
              className=""
            />
            <ToggleCheck label="Retour dans une autre agence&nbsp;?" name="returnAgency" type="checkbox" onChange={updateDropoffLocation} className="w-1/2 mb-2" />
            {
              addDropoff == true && (
                <SelectField
                  label="Lieu de récuperation ?"
                  name="dropoffLocation"
                  onChange={handleChange}
                  options={[
                    { value: "Riviéra M'badon, Abidjan" },
                    { value: "Aéroport Félix Houphouet Boigny, Abidjan" },
                  ]}
                  defaultValue=""
                  className=""
                  Icon={CiLocationOn}
                />
            )}
          <div className="flex gap-5 mb-5">
            <InputDateTime label="Date de récuperation" nameDate="pickupDate" nameTime="pickupTime" valueDate={formValue.pickupDate} valueTime={formValue.pickupTime} onChange={handleChange} className="" />
            <InputDateTime label="Date de retour" nameDate="dropoffDate" nameTime="dropoffTime" valueDate={formValue.dropoffDate} valueTime={formValue.dropoffTime} onChange={handleChange} className="" />
          </div>
          <div className="flex flex-row w-full mb-5 gap-5">
            <ToggleCheck label="Avec chauffeur ?" name="withDriver" type="checkbox" onChange={updatePrice} className="w-1/2" />
            <ToggleCheck label="Heure de retour" name="outCapital" type="checkbox" onChange={updatePrice} className="w-1/2" />
          </div>
          <FinalPrice price={finalPrice} />
          <button className="btn bg-light-orange text-dark-gray" onClick={nextStep}>Suivant</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <div className="flex flex-row w-full mb-5 gap-5">
            <InputField label="Prénom" placeholder="Votre Prénom" type='text' name="firstName" value={formValue.firstName} onChange={handleChange} />
            <InputField label="Nom" placeholder="Votre Nom" type='text' name="lastName" value={formValue.lastName} onChange={handleChange} />
          </div>
          <div className="flex flex-row w-full mb-5 gap-5">
            <InputField label="Numéro de tél" placeholder="Numéro de tél" type='tel' name="phoneNumber" value={formValue.phoneNumber} onChange={handleChange} />
            <InputField label="Numéro de WhatsApp" placeholder="Numéro de WhatsApp" type='tel' name="whatsAppNumber" value={formValue.whatsAppNumber} onChange={handleChange} />
          </div>
          <div className="flex flex-row w-full mb-5 gap-5">
            <InputField label="Email" placeholder="Votre email" type='email' className="w-1/2" name="emailAdress" value={formValue.emailAdress} onChange={handleChange} />
            <SelectField
              label="Votre age"
              name="age"
              onChange={handleChange}
              options={[
                { value: "21-24" },
                { value: "25-29" },
                { value: "30+" },
              ]}
              defaultValue={formValue.age}
              className="w-1/2"
            />
          </div>
          <FinalPrice price={ finalPrice } />
          <div className="flex gap-5">
            <button className="btn bg-light-orange text-dark-gray w-40" onClick={prevStep}>Précédent</button>
            <button className="btn w-40 bg-gradient-to-r from-cyan-700 to-cyan-500  text-light-gray hover:text-light-orange  hover:border-transparent transition ease-in duration-200" onClick={handleSubmit}>Réserver</button>
          </div>
        </div>
      )}

      <div className="modal-action absolute bottom-7 right-7">
        <button className="btn bg-orange hover:bg-light-orange text-light-gray hover:text-dark-gray">Annuler</button>
        {/* <button className="group overflow-hidden btn_base py-1 px-3 rounded  items-center flex gap-2 bg-gradient-to-r from-cyan-700 to-cyan-500  text-light-gray hover:text-light-orange hover:bg-primary-black hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0" onClick={handleSubmit}>
          <span className="z-40"> Enregistrer</span>
        </button> */}
      </div>
    </div>
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

export default Form