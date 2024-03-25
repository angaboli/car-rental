import { getCarsList  } from "@/services"
import CarCard from "./carCard"
import BookingModal from "./bookingModal"
import { useState } from "react"
import { MdOutlineCarRental } from "react-icons/md";
import Link  from "next/link";
import CryptoJS from 'crypto-js';
import ButtonMain from '@/components/buttonMain';
import { useCars } from '@/contexts/carsContext';

export default function CarsList (props:any) {
  const { carsList } = useCars();
  const [selectedCar, setSelectedCar ] = useState<any>([]);
  const createNameLink = (name: string) => name.split(" ").join("-").toLowerCase();
  const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY || "";

  // Fonction pour crypter l'ID
  function encryptID(id: string) {
    return CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
  }

  return (
    <div className="flex">
      <div className="relative md:max-w-[1366px] m-3 flex flex-wrap gap-1 mx-auto justify-center">
        { carsList.map((car:any, index:number) => (
          <div key={car.id} className="relative max-w-80 md:max-w-sm min-w-11/12 md:min-w-[540px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
            <div key={index} onClick={() => {(window as any ).my_modal_4.showModal(); setSelectedCar(car)}}>
              <CarCard car={car} />
            </div>
            {
              typeof(car.id) !== 'undefined' && car.id !== null &&
              <ButtonMain label='Je reserve' link={`/reservation/${((car?.id))}`} className='m-2 px-5' />
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