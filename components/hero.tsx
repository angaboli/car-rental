"use client";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import { useRouter  } from "next/navigation"
import { TbCarSuv } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { checkCarAvailability } from "@/services"
import { Carousel } from "@material-tailwind/react";

const Hero = () => {

  const router = useRouter();
  const [openTab, setOpenTab] = useState("berline");
  const [pickUpLoc, setPickUpLoc] = useState(""); // Initialisé avec une chaîne vide
  const [sameAgency, setSameAgency] = useState(true);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [error, setError] = useState('');

  const getOneHourLater = (date:any) => {
    return new Date(date.getTime() + 60 * 60 * 1000);
  };

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
    /* setFormValue(prevState => ({ ...prevState, [fieldName]: value }));

    // Optionnel: Valider à la modification pour une rétroaction instantanée
    setErrors((prevErrors: FormErrors) => {
      const error = validateStep2();
      //const error = validateField(name, value); // Supposez que cette fonction renvoie un message d'erreur ou null
      return { ...prevErrors, [name]: error };
    }); */
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

  const validatePickupDate = (date:any) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    if (date < today) {
      setError("La date de récupération doit être aujourd'hui ou dans le futur.");
      return false;
    }
    setError("");
    return true;
  };

  const validatePickupTime = (time:any) => {
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
  };


  return (
    <div id="reservez" className="bg-light-gray bg-gradient-to-r from-gray-200 to-slate-300">
      <div className="wrapper  min-h-[200px]">
        <h1 className="head_text xs:w-full sm:w-1/2 mx-auto mb-10 pt-20 text-center uppercase">
          L'Élégance sur&nbsp;
          <span className="text-primary-black font-light">quatre&nbsp;</span>
          Roues.
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="md:w-1/2 xs:w-full sm:w-2/3 lg:w-1/2 xl:w-1/4 2xl:w-1/3 mb-4 xs:text-xs sm:text-sm md:text-base flex space-x-4 p-1 bg-transparent rounded-lg shadow-md">
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
          </div>
          <div className={`relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 xs:text-xs sm:text-xs md:text-sm gap-4`}>
            <div className="">
              <div className="flex">
                <label
                  forhtml="recup"
                  className="mb-3 mr-8 block text-base font-medium text-[#07074D]"
                >
                  Lieu de récuperation
                </label>
                <label
                  className="relative flex cursor-pointer items-center rounded-full mb-3 text-base font-medium text-[#07074D]"
                  htmlFor="checkbox-1"
                  data-ripple-dark="true"
                >
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 mr-2  cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity border-blue-green checked:bg-blue-green checked:before:bg-blue-green hover:before:opacity-10"
                    id="checkbox-1"
                    checked={sameAgency}
                    onChange={handleChange}
                  />
                  <div className="pointer-events-none absolute left-1 top-2/4  -translate-y-2/4  text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  Retour a l'agence
                </label>
              </div>
              <div className="main-search mb-8 rounded-lg shadow-md focus:shadow-lg px-6 py-3 w-full flex items-center space-x-6 border border-gray-200 border-opacity-75">
                {/* <input id="recup" x-ref="search" type="text" placeholder="Lieu de récuperation" className="text-base w-full bg-transparent focus:outline-none" /> */}
                <select className=" w-full bg-transparent focus:outline-none" name="location" onChange={handleChange}>
                  <option value="">Lieu de récuperation ?</option>
                  <option>Agence Abijdan</option>
                  <option>Agence Yamoussoukro</option>
                </select>
                <CiLocationOn />
              </div>
            </div>
            <div>
              <label
                forhtml="dateStart"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Date de départ
              </label>
              <div className="main-search mb-8 rounded-lg shadow-md focus:shadow-lg px-6 py-3 w-full flex items-center space-x-6 border border-gray-200 border-opacity-75">
                <input
                  type="date"
                  name="date"
                  id="dateStart"
                  value={pickupDate}
                  className="w-2/3 rounded-md border-none bg-transparent  text-base font-medium text-[#6B7280] outline-none focus:outline-none "
                  onChange={(e) => {setPickupDate(e.target.value); handleChange(e)}}
                  required
                />
                <input
                  type="time"
                  name="time"
                  id="timeStart"
                  className="w-1/3 rounded-md border-none bg-transparent  text-base font-medium text-[#6B7280] outline-none focus:outline-none "
                  value={pickupTime}
                  onChange={(e) => {setPickupTime(e.target.value); handleChange(e)}}
                  required
                />
              </div>
              <span className="feedBack pickupDate pickuptime"></span>
            </div>
            <div>
              <label
                htmlFor="dateEnd"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Date de retour
              </label>
              <div className="main-search mb-8 rounded-lg shadow-md focus:shadow-lg px-6 py-3 w-full flex items-center space-x-6 border border-gray-200 border-opacity-75">
                <input
                  type="date"
                  name="date"
                  id="dateEnd"
                  className="w-2/3 rounded-md border-none bg-transparent  text-base font-medium text-[#6B7280] outline-none focus:outline-none "
                  value={dropoffDate}
                  onChange={(e) => {setDropoffDate(e.target.value); handleChange(e)}}
                  required
                />
                <input
                  type="time"
                  name="time"
                  id="timeEnd"
                  className="w-1/3 rounded-md border-none bg-transparent  text-base font-medium text-[#6B7280] outline-none focus:outline-none "
                  value={dropoffTime}
                  onChange={(e) => {setDropoffTime(e.target.value); handleChange(e)}}
                  required
                />
              </div>
              <span className="feedBack dropoffDate dropoffTime"></span>
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

export default Hero;