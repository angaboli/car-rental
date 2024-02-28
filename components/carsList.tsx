import { getCarsList  } from "@/services"
import CarCard from "./carCard"
import BookingModal from "./bookingModal"
import { useState } from "react"
import { MdOutlineCarRental } from "react-icons/md";
import Link  from "next/link";
import CryptoJS from 'crypto-js';

export default function CarsList (props:any) {
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
        { props.carsList.map((car:any, index:number) => (
          <div className="relative max-w-80 md:max-w-sm min-w-11/12 md:min-w-[540px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
            <div key={index} onClick={() => {(window as any ).my_modal_4.showModal(); setSelectedCar(car)}}>
              <CarCard car={car} />
            </div>
            <Link href={`/reservation/${encodeURIComponent(encryptID(car.id))}`} className="float-right w-40 group overflow-hidden btn_base m-2 py-2 px-3 rounded items-center flex gap-2 bg-gradient-to-r from-cyan-700 to-cyan-500  text-light-gray hover:text-light-orange hover:bg-primary-black hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
              <MdOutlineCarRental className="z-40 transition-all duration-300 group-hover:translate-x-1" />
              <span className="z-40">Je rèserve</span>
              <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
	            </div>
            </Link>
          </div>
        ))}
        <dialog className="modal" id="my_modal_4">
          <BookingModal car={selectedCar} />
        </dialog>
      </div>
    </div>
  )
}