"use client";
import InputDateTime from "@/components/inputDateTime";
import { CiLocationOn } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useRouter  } from "next/navigation"
import { TbCarSuv } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { checkCarAvailability } from "@/services"
import { Carousel, Input, Select, Option, Switch, Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";

interface FormValues {
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  pickupTime?: string;
  dropoffDate?: string;
  dropoffTime?: string;
}

interface AvailabilityState {
  loading: boolean;
  error: Error | null;
  isAvailable: boolean;
}

const Hero = () => {

  const router = useRouter();
  //const [openTab, setOpenTab] = useState<string>("berline");
  const nextHourDate = getNextHour();
  const formattedDate = formatDate(nextHourDate); // YYYY-MM-DD
  const formattedTime = formatTime(nextHourDate); // HH:MM
  /*
  const [sameAgency, setSameAgency] = useState(true);
  const [pickUpLoc, setPickUpLoc] = useState(""); // Initialisé avec une chaîne vide
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState(""); */
  const [addDropoff, setAddDropoff] = useState<Boolean>(false)
  const [error, setError] = useState('');
  const [formValue, setFormValue] = useState<FormValues>({
    pickupLocation: 'Riviéra M&apos;badon, Abidjan',
    dropoffLocation: 'Riviéra M&apos;badon, Abidjan',
    pickupDate: formattedDate,
    dropoffDate: formattedDate,
    pickupTime: formattedTime,
    dropoffTime: "20:00",
  });


  const updateDropoffLocation = (e: React.ChangeEvent<HTMLInputElement>)  => {
     e.target.name == "returnAgency" && setAddDropoff(e.target.checked)
  }


  // Gérer les changements de champ et valider en temps réel
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> , fieldName?: string) => {
    const name = fieldName | event.target.name;
    const value = event.target.value;

    setFormValue(prevState => ({ ...prevState, [name]: value }));
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logique de soumission ici
  };

  /* const validatePickupDate = (date:any) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    if (date < today) {
      setError("La date de récupération doit être aujourd'hui ou dans le futur.");
      return false;
    }
    setError("");
    return true;
  }; */

  /* const validatePickupTime = (time:any) => {
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

  const validateDropoffDate = (date:any) => {
    if (date < pickupDate) {
      setError("La date de retour doit être après la date de récupération.");
      return false;
    }
    setError("");
    return true;
  };

  const validateDropoffTime = (time:any) => {
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
  }; */

    /* useEffect(() => {
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
  }, [formValue.pickupDate, formValue.pickupTime, formValue.dropoffDate, formValue.dropoffTime, addDropoff]); */

  return (
    <div id="reservez" className="bg-light-gray bg-gradient-to-r from-gray-200 to-slate-300">
      <div className="wrapper  min-h-[200px]">
        <h1 className="head_text xs:w-full sm:w-1/2 mx-auto mb-10 pt-20 text-center uppercase">
          L'Élégance sur&nbsp;
          <span className="text-primary-black font-light">quatre&nbsp;</span>
          Roues.
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* <div className="md:w-1/2 xs:w-full sm:w-2/3 lg:w-1/2 xl:w-1/4 2xl:w-1/3 mb-4 xs:text-xs sm:text-sm md:text-base flex space-x-4 p-1 bg-transparent rounded-lg shadow-md">
            <button
              onClick={() => setOpenTab('berline')}
              className={`flex-1 py-2 px-4 rounded-md focus:outline-none items-center flex gap-2 focus:shadow-outline-blue transition-all duration-300 ${openTab === 'berline' ? 'bg-blue-green text-white' : ''}`}
            >
              <FaCar />
              Berline
            </button>
            <button
              onClick={() => setOpenTab('suv')}
              className={`flex-1 py-2 px-4 rounded-md focus:outline-none items-center flex gap-2 focus:shadow-outline-blue transition-all duration-300 ${openTab === 'suv' ? 'bg-blue-green text-white' : ''}`}
            >
              <TbCarSuv />
              SUV
            </button>
            <button
              onClick={() => setOpenTab('prestige')}
              className={`flex-1 py-2 px-4 rounded-md focus:outline-none items-center flex gap-2 focus:shadow-outline-blue transition-all duration-300 ${openTab === 'prestige' ? 'bg-blue-green text-white' : ''}`}
            >
              <IoCarSportOutline />
              Prestige
            </button>
          </div> */}
          <div className={`relative flex xs:text-xs sm:text-xs md:text-sm gap-4 pt-5`}>
            <div className="w-1/3 ">
              <Switch label="Retour dans une autre agence&nbsp;?" name="returnAgency" className="text-[#07074D]" onChange={updateDropoffLocation} color="teal" containerProps={{ className: "", }} crossOrigin="" />
              <Select className="shadow-md rounded-lg" variant="standard" containerProps={{ className: "mt-5 mb-3 rounded-lg", }} placeholder="Lieu de récuperation ?" label="Lieu de récuperation ?" name="pickupLocation" onChange={(value) => handleChange(value, 'pickupLocation')} defaultValue={formValue.pickupLocation} color="teal" >
                <Option value="Riviéra M'badon, Abidjan">Riviéra M'badon, Abidjan</Option>
                <Option value="Aéroport Félix Houphouet Boigny, Abidjan">Aéroport Félix Houphouet Boigny, Abidjan</Option>
              </Select>
              {/* <ToggleCheck label="Retour dans une autre agence&nbsp;?" name="returnAgency" type="checkbox" onChange={updateDropoffLocation} className="w-1/2 mb-2" /> */}
              {
                addDropoff == true && (
                  <Select className="shadow-md" variant="standard" label="Lieu de retour ?" name="dropoffLocation" onChange={(value) => handleChange(value, 'dropoffLocation')} defaultValue={formValue.dropoffLocation} color="teal" placeholder="Lieu de retour ?">
                    <Option value="Riviéra M'badon, Abidjan">Riviéra M'badon, Abidjan</Option>
                    <Option value="Aéroport Félix Houphouet Boigny, Abidjan">Aéroport Félix Houphouet Boigny, Abidjan</Option>
                  </Select>
              )}
            </div>
            <div className="flex gap-5 mb-5 w-2/3">
              <InputDateTime label="Date de récuperation" nameDate="pickupDate" nameTime="pickupTime" valueDate={formValue.pickupDate} valueTime={formValue.pickupTime} onChange={handleChange} className="" />
              <InputDateTime label="Date de retour" nameDate="dropoffDate" nameTime="dropoffTime" valueDate={formValue.dropoffDate} valueTime={formValue.dropoffTime} onChange={handleChange} className="" />
          </div>
          </div>
          <div className="flex justify-end text-center">
            <button type="submit" className="btn_base sm:w-full md:w-1/2 lg:w-1/4 primary_btn mb-10">Choisir ma voiture</button>
          </div>
        </form>
      </div>
    </div>
  )
}

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

export default Hero;