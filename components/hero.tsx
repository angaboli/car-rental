import { useForm, Controller } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Audiowide } from 'next/font/google';
import InputDateTime from "@/components/inputDateTime";
import { useState, useEffect, useMemo, memo } from "react";
import { GetAllBookings } from "@/services";
import { Select, Option, Switch } from "@material-tailwind/react";
import { Car } from '@/types';
import { useCars } from '@/contexts/carsContext';
import SpinnerSearch from '@/components/spinnerSearch';

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface IHeroForm {
  pickUpLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffDate: string;
  dropOffTime: string;
}

const today = new Date();
today.setHours(0, 0, 0, 0);
const validationSchema = yup.object().shape({
  pickUpDate: yup.string()
    .required("La date de récupération est obligatoire.")
    .test(
      'pickUpDate',
      "La date de récupération doit être aujourd'hui ou dans le futur.",
      (value) => {
        const pickUpDate = new Date(value);
        return pickUpDate >= today;
      }
    ),
  pickUpTime: yup.string()
    .required("L'heure de récupération est obligatoire.")
    .test(
      'pickUpTime',
      "L'heure de récupération doit être dans le futur.",
      function (value) {
        const { pickUpDate } = this.parent;
        if (!pickUpDate) return true;
        const now = new Date();
        const pickUpDateTime = new Date(`${pickUpDate}T${value}`);
        return pickUpDateTime > now;
      }
    ),
  dropOffDate: yup.string()
    .required("La date de retour est obligatoire.")
    .test(
      'dropOffDate',
      "La date de retour doit être après la date de récupération.",
      function (value) {
        const { pickUpDate } = this.parent;
        const start = new Date(pickUpDate);
        const end = new Date(value);
        return end >= start;
      }
    ),
  dropOffTime: yup.string()
    .required("L'heure de retour est obligatoire.")
    .test(
      'dropOffTime',
      "L'heure de retour doit être après l'heure de récupération pour le même jour.",
      function (value) {
        const { pickUpTime, pickUpDate, dropOffDate } = this.parent;
        if (pickUpDate !== dropOffDate) return true;
        const startTime = pickUpTime.split(":").map(Number);
        const endTime = value.split(":").map(Number);
        const startDateTime = new Date(pickUpDate);
        startDateTime.setHours(startTime[0], startTime[1], 0);
        const endDateTime = new Date(dropOffDate);
        endDateTime.setHours(endTime[0], endTime[1], 0);
        return endDateTime > startDateTime;
      }
    ),
  pickUpLocation: yup.string().required("Lieu de récupération est obligatoire"),
});

const Hero = memo(() => {
  const { carsList, setCars, loading, setIsAvailable } = useCars();
  const [addDropoff, setAddDropoff] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState(false);
  const [initialValuesLoaded, setInitialValuesLoaded] = useState(false);
  const nextHourDate = getNextHour();
  const formattedDate = formatDate(nextHourDate);
  const formattedTime = formatTime(nextHourDate);

  const initialValues: IHeroForm = {
    pickUpLocation: 'riviera',
    pickUpDate: formattedDate,
    pickUpTime: formattedTime,
    dropOffDate: formattedDate,
    dropOffTime: '20:00',
  }
  const { register, handleSubmit, control, setValue, formState: { errors }, watch } = useForm<IHeroForm>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  useFormPersist("formData", { watch, setValue });

  useEffect(() => {
    const loadPersistedData = async () => {
      const persistedData = JSON.parse(localStorage.getItem("formData") || '{}');
      Object.keys(persistedData).forEach(key => {
        setValue(key as keyof IHeroForm, persistedData[key]);
      });
      setInitialValuesLoaded(true);
    };

    loadPersistedData();
  }, [setValue]);

  const watchPickUpDate = watch("pickUpDate", formattedDate);
  const watchPickUpTime = watch("pickUpTime", formattedTime);
  const watchDropOffDate = watch("dropOffDate", formattedDate);
  const watchDropOffTime = watch("dropOffTime", '20:00');

  const updateDropoffLocation = (checked: boolean) => {
    setAddDropoff(checked);
  };

  const fetchAvailability = async () => {
    const bookings = await GetAllBookings();
    const allBookings = bookings.nodes;
    const pickUpDate = watchPickUpDate;
    const dropOffDate = watchDropOffDate;

    if (pickUpDate && dropOffDate && allBookings.length > 0 && carsList) {
      const availableCars = filterAvailableCars(allBookings, pickUpDate, dropOffDate, carsList);
      setCars(availableCars);
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
      console.log("Les informations nécessaires pour filtrer les voitures ne sont pas toutes disponibles.");
    }
  };

  const onSubmit = async (data: IHeroForm) => {
    setIsSearching(true);
    try {
      await fetchAvailability();
    } finally {
      setIsSearching(false);
    }
  };

  if (!initialValuesLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div id="reservez" className="bg-light-gray bg-gradient-to-r from-gray-200 to-slate-300">
      {(isSearching ) && <SpinnerSearch />}
      <div className={`wrapper min-h-[200px]`}>
        <h1 className={`${audiowide.className} head_text xs:w-full sm:w-1/2 mx-auto mb-10 pt-20 text-center font-bold uppercase`}>
          L'Élégance sur&nbsp;
          <span className={`${audiowide.className} text-primary-black`}>quatre&nbsp;</span>
          Roues.
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className={`relative items-center flex flex-col lg:flex-row xs:text-xs sm:text-xs md:text-sm gap-4 `}>
            <div className="w-full md:w-1/3">
              {/* <input
                type="checkbox"
                className="toggle"
                defaultChecked={addDropoff}
                {...register("returnAgency")}
                onChange={(e) => {
                  setValue("returnAgency", e.target.checked);
                  updateDropoffLocation(e.target.checked);
                }}
              /> */}
              <div className="flex flex-wrap gap-5">
                <Controller
                  name="pickUpLocation"
                  control={control}
                  defaultValue="riviera"
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="shadow-md rounded-lg "
                      containerProps={{ className: "mt-5 rounded-lg py-3", }}
                      placeholder="Lieu de récuperation ?"
                      label="Lieu de récuperation ?"
                      color="orange"
                    >
                      <Option value="riviera">Riviéra CIAD, Abidjan</Option>
                      <Option value="aeroport">Aéroport Félix Houphouet Boigny, Abidjan</Option>
                    </Select>
                  )}
                />
                {errors.pickUpLocation && <p className="text-red-500">{errors.pickUpLocation.message}</p>}
                {/* {addDropoff && (
                  <Controller
                    name="dropoffLocation"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="shadow-md"
                        containerProps={{ className: "", }}
                        label="Lieu de retour ?"
                        color="orange"
                        placeholder="Lieu de retour ?"
                      >
                        <Option value="riviera">Riviéra CIAD, Abidjan</Option>
                        <Option value="aeroport">Aéroport Félix Houphouet Boigny, Abidjan</Option>
                      </Select>
                    )}
                  />
                )}
                {errors.dropoffLocation && <p className="text-red-500">{errors.dropoffLocation.message}</p>} */}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 mb-5 w-full md:w-2/3">
              <InputDateTime
                label="Date de récuperation"
                nameDate="pickUpDate"
                nameTime="pickUpTime"
                valueDate={watchPickUpDate}
                valueTime={watchPickUpTime}
                errors={errors.pickUpDate?.message}
                onChangeDate={(e) => setValue('pickUpDate', e.target.value)}
                onChangeTime={(e) => setValue('pickUpTime', e.target.value)}
                className=""
              />
              <InputDateTime
                label="Date de retour"
                nameDate="dropOffDate"
                nameTime="dropOffTime"
                valueDate={watchDropOffDate}
                valueTime={watchDropOffTime}
                errors={errors.dropOffDate?.message}
                onChangeDate={(e) => setValue('dropOffDate', e.target.value)}
                onChangeTime={(e) => setValue('dropOffTime', e.target.value)}
                className=""
              />
            </div>
          </div>
          <div className="flex justify-end text-center">
            <button type="submit" className="btn_base sm:w-full md:w-1/2 lg:w-1/4 primary_btn mb-10">Recherche</button>
          </div>
        </form>
      </div>
    </div>
  );
});

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
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Filtrer les voitures disponibles
const filterAvailableCars = (bookings: any[], pickUpDate: string, dropOffDate: string, allCars: Car[]): Car[] => {
  const start = new Date(pickUpDate);
  const end = new Date(dropOffDate);

  const unavailableCarIds = new Set(
    bookings.filter(booking => {
      const bookingStart = new Date(booking.bookings?.pickUpDate);
      const bookingEnd = new Date(booking.bookings?.dropOffDate);
      return (start <= bookingEnd && end >= bookingStart);
    }).map(booking => booking.bookings.carId.edges[0].node.id)
  );
  return allCars?.filter(car => !unavailableCarIds.has(car.id));
};

export default Hero;