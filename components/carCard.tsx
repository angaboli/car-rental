import Image from "next/image"
import { TbManualGearbox } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { TbCarSuv } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineCarRental } from "react-icons/md";


export default function CarCard(props:any) {

    const getCategoryIcon = (categoryName:any) => {
    switch (categoryName) {
      case 'SUV':
        return <TbCarSuv />;
      case 'Berline':
        return <FaCar />;
      case 'Prestige':
        return <IoCarSportOutline />;
      default:
        return <FaCar />;
    }
  };

  return (
    <div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
          <div className="overflow-x-hidden rounded-2xl relative">
            { props.car?.image ?
              <Image
                src={props.car?.image?.url}
                className="h-40 rounded-2xl w-full object-cover"
                alt={props.car.name}
                width={320}
                height={160}
              /> :
              <div className="skeleton h-36 w-full"></div>
            }
            <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group hidden">
              absolute
            </p>
          </div>
          <div className="mt-4 pl-2 mb-2 flex">
            <div className="flex flex-col w-full">
              <div className="flex gap-5 border-y border-light-gray py-2 my-3">
                <div className="flex items-center gap-1">
                  <span className="text-dark-gray">
                    { getCategoryIcon(props.car.carCategory) }
                  </span>
                  {props.car.carCategory}
                </div>
                <div className="flex items-center gap-1">
                  <TbManualGearbox className="text-dark-gray" />
                  {props.car.carType?.substr(0,1)}
                </div>
                <div className="flex items-center gap-1">
                  <MdAirlineSeatReclineNormal className="text-dark-gray" />
                  {props.car.places}
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-0">{ props.car.name}</p>
              <div className="flex justify-between">
                <p className="text-md text-gray-800 mt-0">
                  <span className="font-bold text-md">{
                    new Intl.NumberFormat('fr-CI', { style: 'currency', currency: 'CFA' }).format( props.car.price) }&nbsp;
                    </span>
                  <span className="font-12px">/jr</span>
                </p>
                <button className="group overflow-hidden btn_base mr-2 py-1 px-3 rounded  items-center flex gap-2 bg-gradient-to-r from-cyan-700 to-cyan-500  text-light-gray hover:text-light-orange hover:bg-primary-black hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                  <MdOutlineCarRental className="z-40 transition-all duration-300 group-hover:translate-x-1" />
                  <span className="z-40">Je rèserve</span>
                  <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
	                </div>
                </button>
              </div>
            </div>
            {/* <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div> */}
          </div>
        </div>

  )
}