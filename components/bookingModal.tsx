import CarDetails from "./carDetails"
import Form from "./form"
import { IoCloseCircleOutline } from "react-icons/io5";

const BookingModal = ({car} :any) => {
  return (
    <form method="dialog"  className="modal-box w-11/12 max-w-7xl bg-light-gray">
      <div className="relative">
        <div className='border-b-[1px] pb-2 '>
          <h3 className=" text-[30px] font-light text-gray-400">
            Réservez maintenant
          </h3>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-5'>
        <div>
          <CarDetails car={car} />
        </div>
        <div>
          <Form car={car} />
        </div>
      </div>
    </form>
  )
}

export default BookingModal