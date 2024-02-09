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
    <div className="relative max-w-80 md:max-w-sm min-w-11/12 md:min-w-[540px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
          <div className="overflow-x-hidden rounded-2xl relative">
            { props.car?.image ?
              <Image
                src={props.car?.image?.url}
                className="h-64 rounded-2xl w-full object-cover"
                alt={props.car.name}
                width={520}
                height={320}
              /> :
              <div className="skeleton h-36 w-full"></div>
            }
            <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group hidden">
              absolute
            </p>
          </div>
          <div className="mt-4 pl-2 mb-2 flex">
            <div className="flex flex-col w-full">
              <div className="flex gap-5 border-y border-light-gray py-1 my-3">
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
              <div className="flex flex-col">
                <div className="flex-col">
                  <p className="mr-2 truncate mb-1">{props.car.shortDescription}</p>
                  <p className="text-md text-gray-800 mt-0">
                    <span className="font-bold text-md">{
                      new Intl.NumberFormat('fr-CI', { style: 'currency', currency: 'CFA' }).format( props.car.price) }&nbsp;
                      </span>
                    <span className="font-12px">/jr</span>
                  </p>
                </div>
                <button className="place-self-end w-40 group overflow-hidden btn_base mr-2 py-2 px-3 rounded  items-center flex gap-2 bg-gradient-to-r from-cyan-700 to-cyan-500  text-light-gray hover:text-light-orange hover:bg-primary-black hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                  <MdOutlineCarRental className="z-40 transition-all duration-300 group-hover:translate-x-1" />
                  <span className="z-40">Je rèserve</span>
                  <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
	                </div>
                </button>
              </div>
            </div>
          </div>
        </div>

  )
}