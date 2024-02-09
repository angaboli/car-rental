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
      </div>
    </div>
  )
}

export default Hero;