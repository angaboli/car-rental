import React, { useEffect, useState, useMemo, memo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from 'next/navigation';
import InputDateTime from "./inputDateTime";
import { Input, Select, Option, Switch, Tooltip, Chip } from "@material-tailwind/react";
import ButtonMain from '@/components/buttonMain';
import SkeletonPage from '@/components/SkeletonPage';
import SpinnerSearch from "./spinnerSearch";
import { sendBooking } from "@/services";
import { Car, IFormValues, ReservationModalProps } from '@/types';
import { BsInfoCircleFill } from "react-icons/bs";
import ToastMessage from '@/components/ToastMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//import "yup-phone";
import useFormPersist from 'react-hook-form-persist';
import { sendBookingEmail } from "@/services/sendEmail";

interface FormProps {
  car: Car;
  loading: boolean;
  className?: string;
}

const Form: React.FC<FormProps> = memo(({ car, loading, className }) => {

  const router = useRouter();
  const nextHourDate = getNextHour();
  const formattedDate = formatDate(nextHourDate);
  const formattedTime = formatTime(nextHourDate);
  const [carId, setCarId] = useState(car.id || "");
  const [finalPrice, setFinalPrice] = useState(car.carACF?.price || 0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(loading);
  const [isSearching, setIsSearching] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [addDropoff, setAddDropoff] = useState(false);
  const [withDriver, setWithDriver] = useState(false);
  const [outCapital, setOutCapital] = useState(false);
  const initialValues: IFormValues = {
    pickUpLocation: 'riviera',
    dropOffLocation: 'riviera',
    pickUpDate: formattedDate,
    pickUpTime: formattedTime,
    dropOffDate: formattedDate,
    dropOffTime: '20:00',
    withDriver: withDriver,
    outCapital: outCapital,
    firstName: "",
    lastName: "",
    emailAdress: "",
    phoneNumber: "",
    whatsAppNumber: "",
    age: "30+",
    returnAgency: false,
    finalPrice: finalPrice,
    carId: carId,
    carDBId: car.databaseId,
    title: '',
  }
  const { register, handleSubmit, setValue, control, formState: { errors }, reset, watch } = useForm<IFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const [rentWithDriver, setRentWithDriver] = useState(false);
  const watchPickUpDate = watch("pickUpDate", formattedDate);
  const watchPickUpTime = watch("pickUpTime", formattedTime);
  const watchDropOffDate = watch("dropOffDate", formattedDate);
  const watchDropOffTime = watch("dropOffTime", '20:00');
  const watchWithDriver = watch("withDriver", false);
  const watchOutCapital = watch("outCapital", false);

  useFormPersist("formData", { watch, setValue });



  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  const updatedropOffLocation = (checked: boolean) => {
    setAddDropoff(checked);
  }

  const updatePrice = (name: string, checked: boolean) => {
    setValue(name as keyof IFormValues, checked);
    if (name === "withDriver") {
      setWithDriver(checked);
    } else if (name === "outCapital") {
      setOutCapital(checked);
    }
  }

  useEffect(() => {
    if (car) {
      setCarId(car.id || "");
      setFinalPrice(car.carACF?.price || 0);
      setValue("carId", car.id || "");
      setValue("finalPrice", car.carACF?.price || 0);
    }
  }, [car, setValue]);

  const startDate = useMemo(() => new Date(watchPickUpDate), [watchPickUpDate]);
  const endDate = useMemo(() => new Date(watchDropOffDate), [watchDropOffDate]);
  const timeDiff = useMemo(() => endDate.getTime() - startDate.getTime(), [endDate, startDate]);
  const daysDiff = useMemo(() => (Math.ceil(timeDiff / (1000 * 3600 * 24))) + 1, [timeDiff]);

  useEffect(() => {
    let price = car?.carACF?.price * daysDiff;
    if (watchWithDriver) {
      price += 5000 * daysDiff;
      setRentWithDriver(true);
    }
    if (watchOutCapital) {
      price += 10000 * daysDiff;
    }
    setFinalPrice(price);
    setValue("finalPrice", price);
  }, [watchWithDriver, watchOutCapital, car?.carACF?.price, watchPickUpDate, watchDropOffDate, setValue, daysDiff]);

  const onSubmit = async(data: typeof initialValues) => {
    console.log(data);

    const posTitle = `#${car.title} [${data.pickUpDate}_${data.pickUpTime}]-[${data.dropOffDate}_${data.dropOffTime}]`;
    data.title = posTitle;
    data.carDBId = car.databaseId;

    setIsSearching(true);
    try {
      const response = await sendBooking(data);
      const responseMessage = await sendBookingEmail(data);
      if (response === true) {
        setToastMessage(responseMessage);
        //setToastMessage('E-mail envoyé avec succès');
        setIsModalOpen(true);
        sessionStorage.removeItem("formData");
        reset();
      } else {
        setToastMessage('Erreur lors de la création de la réservation');
      }
    } catch (error) {
      console.error("Erreur lors de la création de la réservation :", error);
      setToastMessage('Erreur lors de la création de la réservation');
    } finally {
      setIsSearching(false);
      setTimeout(() => setToastMessage(null), 5000);
    }
  };


  return (
    <>
      {isLoading ? (
        <div className="max-w-7xl bg-light-gray">
          <SkeletonPage />
        </div>
      ) : (
        <>
          {isSearching && <SpinnerSearch />}
          <form method="" onSubmit={handleSubmit(onSubmit)} className={`${className} max-w-7xl bg-light-gray mb-3`}>
            <div>
              <div className="shadow-md rounded-3xl p-5 my-3">
                <h3 className="font-bold text-gold text-xl mb-3">Votre réservation</h3>
                <div>
                  <Controller
                    name="pickUpLocation"
                    control={control}
                    defaultValue="riviera"
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Lieu de récuperation ?"
                        label="Lieu de récuperation ?"
                      >
                        <Option value="riviera">Riviéra CIAD, Abidjan</Option>
                        <Option value="aeroport">Aéroport Félix Houphouet Boigny, Abidjan</Option>
                      </Select>
                    )}
                  />
                  <div className="form-control w-fit font-light">
                    <label className="label cursor-pointer gap-3">
                      <span className="label-text">Retour dans une autre agence&nbsp;?&nbsp;</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-sm my-5"
                        defaultChecked={addDropoff}
                        {...register("returnAgency")}
                        onChange={(e) => {
                          setValue("returnAgency", e.target.checked);
                          updatedropOffLocation(e.target.checked);
                        }}
                      />
                    </label>
                  </div>
                  {/* <Controller
                    name="returnAgency"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        label="Retour dans une autre agence&nbsp;?"
                        checked={field.value}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          field.onChange(checked);
                          updatedropOffLocation(checked);
                        }}
                        containerProps={{ className: "my-5" }}
                        crossOrigin=""
                      />
                    )}
                  /> */}
                  {addDropoff && (
                    <Controller
                      name="dropOffLocation"
                      control={control}
                      defaultValue="riviera"
                      rules={{ required: 'Lieu de retour est requis' }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Lieu de retour ?"
                          placeholder="Lieu de retour ?"
                          containerProps={{ className: "mb-5", }}
                          error={!!errors.dropOffLocation}
                        >
                          <Option value="riviera">Riviéra CIAD, Abidjan</Option>
                          <Option value="aeroport">Aéroport Félix Houphouet Boigny, Abidjan</Option>
                        </Select>
                      )}
                    />
                  )}
                  {errors.dropOffLocation && <p className="text-alert-error">{errors.dropOffLocation.message}</p>}
                  <div className="flex flex-col md:flex-row gap-5 mb-5">
                    <InputDateTime
                      label="Date de récuperation"
                      nameDate="pickUpDate"
                      nameTime="pickUpTime"
                      valueDate={watchPickUpDate}
                      valueTime={watchPickUpTime}
                      onChangeDate={(e) => setValue('pickUpDate', e.target.value)}
                      onChangeTime={(e) => setValue('pickUpTime', e.target.value)}
                      className=""
                      errors={errors.pickUpDate?.message}
                    />
                    <InputDateTime
                      label="Date de retour"
                      nameDate="dropOffDate"
                      nameTime="dropOffTime"
                      valueDate={watchDropOffDate}
                      valueTime={watchDropOffTime}
                      onChangeDate={(e) => setValue('dropOffDate', e.target.value)}
                      onChangeTime={(e) => setValue('dropOffTime', e.target.value)}
                      className=""
                      errors={errors.dropOffDate?.message}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row w-full mb-5 sm:gap-10">
                    <div className={`flex ${(car?.carACF?.withDriver === true) && "flex-col"} font-light`}>
                      <div className="form-control w-fit font-light">
                        {!(car?.carACF?.withDriver) ?
                          <label className="label cursor-pointer gap-3">
                            <span className="label-text">Avec chauffeur&nbsp;?&nbsp;</span>
                            <input
                              type="checkbox"
                              className="toggle toggle-sm my-5"
                              defaultChecked={rentWithDriver}
                              {...register("withDriver")}
                              onChange={(e) => {
                                setValue("withDriver", e.target.checked);
                                updatePrice('withDriver', e.target.checked);
                              }}
                            />
                          </label>
                          :
                          <div className="flex items-center gap-2">
                            <BsInfoCircleFill className="text-gold" />
                            <p>Cette voiture est loué avec chauffeur</p>
                          </div>
                        }
                      </div>
                      <div className="form-control w-fit ">
                        <label className="label cursor-pointer gap-3">
                          <span className="label-text">Hors Abidjan&nbsp;?&nbsp;</span>
                          <input
                            type="checkbox"
                            className="toggle toggle-sm my-5"
                            defaultChecked={addDropoff}
                            {...register("outCapital")}
                            onChange={(e) => {
                              setValue("outCapital", e.target.checked);
                              updatePrice('outCapital', e.target.checked);
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    {/* <Controller
                        name="withDriver"
                        control={control}
                        defaultValue={rentWithDriver ? true : false}
                        render={({ field }) => (
                          <Switch
                            {...field}
                            label='Avec chauffeur&nbsp;?'
                            checked={field.value}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              field.onChange(checked);
                              updatePrice('withDriver', checked);
                            }}
                            disabled={car?.carACF?.withDriver}
                            containerProps={{ className: "my-5" }}
                            crossOrigin=""
                          />
                        )}
                      />
                      {car?.carACF?.withDriver && (
                        <Tooltip className="" content='Location avec chauffeur obligatoire.'>
                          <button>
                            <sup>
                              <BsInfoCircleFill className="text-gold text-xl ml-3 cursor-none" />
                            </sup>
                          </button>
                        </Tooltip>
                      )}
                    <Controller
                      name="outCapital"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          label="Hors Abidjan&nbsp;?"
                          checked={field.value}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            field.onChange(checked);
                            updatePrice('outCapital', checked);
                          }}
                          containerProps={{ className: "my-5" }}
                          crossOrigin=""
                        />
                      )}
                    /> */}
                  </div>
                  <div className="flex">
                    {!isNaN(finalPrice) && <FinalPrice price={finalPrice} />}
                  </div>
                </div>
              </div>
              <div className="shadow-md rounded-3xl p-5 text-primary-black">
                <h3 className="font-bold text-gold text-xl mb-3">Vos Coordonnées</h3>
                <div>
                  <div className="flex flex-col sm:flex-row w-full mb-5 gap-5">
                    <div className='flex flex-col w-full sm:w-1/2'>
                      <Input
                        label="Votre Prénom"
                        type='text'
                        {...register('firstName', { required: 'Prénom est requis' })}
                        crossOrigin=""
                      />
                      {errors.firstName && <div className="text-alert-error">{errors.firstName.message}</div>}
                    </div>
                    <div className='flex flex-col w-full sm:w-1/2'>
                      <Input
                        label="Votre Nom"
                        type='text'
                        {...register('lastName', { required: 'Nom est requis' })}
                        crossOrigin=""
                      />
                      {errors.lastName && <div className="text-alert-error">{errors.lastName.message}</div>}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row w-full mb-5 gap-5">
                    <div className='flex flex-col w-full sm:w-1/2'>
                      <Input
                        label="Numéro de tél"
                        type='tel'
                        {...register('phoneNumber', { required: 'Numéro de téléphone est requis' })}
                        crossOrigin=""
                      />
                      {errors.phoneNumber && <div className="text-alert-error">{errors.phoneNumber.message}</div>}
                    </div>
                    <div className='flex flex-col w-full sm:w-1/2'>
                      <Input
                        label="Numéro de WhatsApp"
                        type='tel'
                        {...register('whatsAppNumber')}
                        crossOrigin=""
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row w-full mb-5 gap-5">
                    <div className='flex flex-col w-1/2'>
                      <Input
                        label="Votre email"
                        type='email'
                        {...register('emailAdress', { required: 'Email est requis' })}
                        crossOrigin=""
                      />
                      {errors.emailAdress && <div className="text-alert-error">{errors.emailAdress.message}</div>}
                    </div>
                    <div className="w-1/2">
                      <Controller
                        name="age"
                        control={control}
                        defaultValue="30+"
                        render={({ field }) => (
                          <Select
                            {...field}
                            label="Votre age"
                            placeholder="Votre age"
                          >
                            <Option value="21-24">21-24</Option>
                            <Option value="25-29">25-29</Option>
                            <Option value="30+">30+</Option>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap justify-between my-3 gap-5'>
                    {!isNaN(finalPrice) && <FinalPrice price={finalPrice} />}
                    <ButtonMain id="submitForm" type="submit" label='Je valide' className='px-8' />
                  </div>
                </div>
              </div>
            </div>
          </form>
            {toastMessage && (
              <ToastMessage alert={toastMessage === "E-mail envoyé avec succès" ? "success" : "error"} message={toastMessage} />
            )}
          <ReservationModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
      )}
    </>
  );
});

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 items-center">
      <div className="relative m-4 w-2/3 md:w-1/2 min-w-[50%] max-w-[75%] rounded-lg bg-white leading-relaxed text-primary-black antialiased shadow-2xl">
        <div className="flex items-center p-4 text-2xl leading-snug shrink-0 font-light text-gold">Votre réservation</div>
        <p className="relative p-4 leading-relaxed border-t border-b border-t-tacha-100 border-b-tacha-100">
          Votre réservation a été prise en compte, nous reviendrons vers vous dans les plus brefs délais.
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
);

function getNextHour() {
  const now = new Date();
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setHours(now.getHours() + 1);
  return now;
}

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

function formatTime(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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
  returnAgency: yup.boolean(),
  dropOffLocation: yup.string(),
  withDriver: yup.boolean(),
  outCapital: yup.boolean(),
  firstName: yup.string().required("Prénom est obligatoire"),
  lastName: yup.string().required("Nom est obligatoire"),
  emailAdress: yup.string().email("Email invalide").required("Email est obligatoire"),
  phoneNumber: yup.string().required("Numéro de téléphone est obligatoire"),
  whatsAppNumber: yup.string(),
  age: yup.string(),
  carId: yup.string().required("CarId"),
  carDBId: yup.number().required("CarDBId"),
  finalPrice: yup.number().required('finalPrice'),
});
export default Form;