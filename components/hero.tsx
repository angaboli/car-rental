"use client";
import InputDateTime from "@/components/inputDateTime";
import { useState, useEffect } from "react";
import { useRouter  } from "next/navigation"
import { GetAllBookings } from "@/services"
import { Select, Option, Switch } from "@material-tailwind/react";
import { useCars } from '@/contexts/carsContext';
import { Car } from '@/types/';

interface FormValues {
  pickUpLocation?: string;
  dropoffLocation?: string;
  pickUpDate?: string;
  pickUpTime?: string;
  dropOffDate?: string;
  dropOffTime?: string;
}

interface AvailabilityState {
  loading: boolean;
  error: Error | null;
  isAvailable: boolean;
}

const Hero = (carsList: any ) => {

  const router = useRouter();
  //const [openTab, setOpenTab] = useState<string>("berline");
  const nextHourDate = getNextHour();
  const formattedDate = formatDate(nextHourDate); // YYYY-MM-DD
  const formattedTime = formatTime(nextHourDate); // HH:MM
  const [addDropoff, setAddDropoff] = useState<Boolean>(false)
  const [error, setError] = useState('');
  const { setCars } = useCars();
  const [formValue, setFormValue] = useState<FormValues>({
    pickUpLocation: 'Riviéra M&apos;badon, Abidjan',
    dropoffLocation: 'Riviéra M&apos;badon, Abidjan',
    pickUpDate: formattedDate,
    dropOffDate: formattedDate,
    pickUpTime: formattedTime,
    dropOffTime: "20:00",
  });
  const [availability, setAvailability] = useState<AvailabilityState>({
    loading: true,
    error: null,
    isAvailable: false,
  });


  const updateDropoffLocation = (e: React.ChangeEvent<HTMLInputElement>)  => {
     e.target.name == "returnAgency" && setAddDropoff(e.target.checked)
  }

  useEffect(() => {
    const fetchAvailability = async () => {
      console.log(carsList)
      const bookings = await GetAllBookings();
      const availableCars = await filterAvailableCars(bookings.data?.bookings, formValue.pickUpDate, formValue.dropOffDate, carsList);

      console.log(availableCars);
      setCars(availableCars);
    };

    fetchAvailability();
  }, []);


  // Gérer les changements de champ et valider en temps réel
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> , fieldName?: string) => {
    let name: string;
    let value: string;

    if (typeof event === 'string') {
      // Appel direct avec valeur et nom de champ
      if (!fieldName) {
        console.error("fieldName must be provided when calling handleChange with a string");
        return;
      }
      name = fieldName;
      value = event;
    } else {
      // Appel avec un événement
      name = event.target.name;
      value = event.target.value;
    }
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValue)
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
          <div className={`relative flex xs:text-xs sm:text-xs md:text-sm gap-4 pt-5`}>
            <div className="w-1/3 ">
              <Switch label="Retour dans une autre agence&nbsp;?" name="returnAgency" className="text-[#07074D]" onChange={updateDropoffLocation} color="teal" containerProps={{ className: "", }} crossOrigin="" />
              <Select
                className="shadow-md rounded-lg"
                containerProps={{ className: "mt-5 mb-3 rounded-lg", }}
                placeholder="Lieu de récuperation ?"
                label="Lieu de récuperation ?"
                name="pickUpLocation"
                onChange={ (e) => handleChange(e , 'pickUpLocation') }
                defaultValue={formValue.pickUpLocation}
                color="orange"
              >
                <Option value="Riviéra M'badon, Abidjan">Riviéra M'badon, Abidjan</Option>
                <Option value="Aéroport Félix Houphouet Boigny, Abidjan">Aéroport Félix Houphouet Boigny, Abidjan</Option>
              </Select>
              {/* <ToggleCheck label="Retour dans une autre agence&nbsp;?" name="returnAgency" type="checkbox" onChange={updateDropoffLocation} className="w-1/2 mb-2" /> */}
              {
                addDropoff == true && (
                  <Select
                    className="shadow-md"
                    label="Lieu de retour ?"
                    name="dropoffLocation"
                    onChange={ (e) => handleChange( e , 'dropoffLocation') }
                    defaultValue={formValue.dropoffLocation}
                    color="orange"
                    placeholder="Lieu de retour ?"
                  >
                    <Option value="Riviéra M'badon, Abidjan">Riviéra M'badon, Abidjan</Option>
                    <Option value="Aéroport Félix Houphouet Boigny, Abidjan">Aéroport Félix Houphouet Boigny, Abidjan</Option>
                  </Select>
              )}
            </div>
            <div className="flex gap-5 mb-5 w-2/3">
              <InputDateTime label="Date de récuperation" nameDate="pickUpDate" nameTime="pickUpTime" valueDate={formValue.pickUpDate} valueTime={formValue.pickUpTime} onChange={handleChange} className="" />
              <InputDateTime label="Date de retour" nameDate="dropOffDate" nameTime="dropOffTime" valueDate={formValue.dropOffDate} valueTime={formValue.dropOffTime} onChange={handleChange} className="" />
          </div>
          </div>
          <div className="flex justify-end text-center">
            <button type="submit" className="btn_base sm:w-full md:w-1/2 lg:w-1/4 primary_btn mb-10">Continuer</button>
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

const filterAvailableCars = (bookings: any[], pickUpDate : string, dropOffDate: string, allCars: Car[] ): Car[] => {
  // Convertissez les dates en objets Date pour la comparaison
  const start = new Date(pickUpDate);
  const end = new Date(dropOffDate);

  const unavailableCarIds = new Set(
    bookings.filter(booking => {
      const bookingStart = new Date(booking.pickUpDate);
      const bookingEnd = new Date(booking.dropOffDate);

      // Vérifiez si la période de réservation se chevauche avec les dates sélectionnées
      return (start <= bookingEnd && end >= bookingStart);
    }).map(booking => booking.carId)
  );

  // Ici, supposez que vous avez une liste `allCars` contenant toutes les voitures
  return allCars.filter(car => !unavailableCarIds.has(car.id));
};

export default Hero;