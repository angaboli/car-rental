import { getCarsList } from "@/services"
import { useRouter } from 'next/navigation';
import CarCard from "./carCard"
import BookingModal from "./bookingModal"
import { useEffect, useState } from "react"
import { MdOutlineCarRental } from "react-icons/md";
import Link from "next/link";
import CryptoJS from 'crypto-js';
import ButtonMain from '@/components/buttonMain';
import { useCars } from '@/contexts/carsContext';
import { Tooltip } from "@material-tailwind/react";
import { BsInfoCircleFill } from "react-icons/bs";
import { useFormContext } from "@/contexts/formContext";

export default function CarsList(props: any) {
  const { carsList, isAvailable } = useCars();
  const { formData, setFormData } = useFormContext();
  const router = useRouter();
  //const { disable, setdisable } = useState<boolean>(true);
  const [selectedCar, setSelectedCar] = useState<any>([]);
  const createNameLink = (name: string) => name.split(" ").join("-").toLowerCase();
  const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY || "";
  //const encrypted = encodeURIComponent(encryptID(car?.id))
  useEffect(() => {
    isAvailable !== true && 'disable';
  }, [isAvailable])
  // Fonction pour crypter l'ID
  function encryptID(id: string) {
    return CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
  }


  /* const handleReserveClick = (carId: string) => {
    router.push({
      pathname: `/reservation/${carId}`,
      query: { ...formData },
    });
  }; */
  const handleReserveClick = (carId: string) => {
    setFormData(prevFormData => ({ ...prevFormData, carId }));
    router.push(`/reservation/${carId}`); // Redirect to reservation page
  };

  return (
    <div className="flex">
      <div className="relative md:max-w-[1366px] m-3 flex flex-wrap gap-1 mx-auto justify-center">
        {carsList.map((car: any, index: number) => (
          <div key={car.id} className="relative max-w-80 md:max-w-sm min-w-11/12 md:min-w-[540px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
            <div key={index} onClick={() => { (window as any).my_modal_4.showModal(); setSelectedCar(car) }}>
              <CarCard car={car} />
            </div>
            {
              (typeof (car.id) !== 'undefined' && car.id !== null) &&
              <>
                {
                  isAvailable ?
                    <ButtonMain label='Je reserve' onClick={() => handleReserveClick(car.id)} className='m-2 px-5' /> :
                    <div className="float-right mr-4">
                      <Tooltip id="#reservez" className="" content='Veuillez remplir le formulaire pour voir les voitures disponibles.'>
                        <button>
                          <sup>
                            <BsInfoCircleFill className="text-gold text-xl ml-3 cursor-none" />
                          </sup>
                        </button>
                      </Tooltip>
                    </div>
                }
              </>
            }
          </div>
        ))}
        <dialog className="modal" id="my_modal_4">
          <BookingModal car={selectedCar} />
        </dialog>
      </div>
    </div>
  )
}