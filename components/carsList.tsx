import { getCarsList  } from "@/services"
import CarCard from "./carCard"
import BookingModal from "./bookingModal"
import { useState } from "react"

export default function CarsList (props:any) {
  const [selectedCar, setSelectedCar ] = useState<any>([]);
  return (
    <div className="flex">
      <div className="relative m-3 flex flex-wrap gap-1 mx-auto justify-center">
        { props.carsList.map((car:any, index:number) => (
          <div key={index} onClick={() => {(window as any ).my_modal_4.showModal(); setSelectedCar(car)}}>
            <CarCard car={car} />
          </div>
        ))}
        <dialog className="modal" id="my_modal_4">
          <BookingModal car={selectedCar} />
        </dialog>
      </div>
    </div>
  )
}