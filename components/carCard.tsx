import Image from "next/image"
import { TbManualGearbox } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { TbCarSuv } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineCarRental } from "react-icons/md";


export default function CarCard(props: any) {

  const getCategoryIcon = (categoryName: any) => {
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
    <div>
      <div className="overflow-x-hidden rounded-2xl relative">
        {props.car?.carACF?.image ?
          <Image
            src={props.car?.carACF?.image?.node.sourceUrl}
            priority={false}
            className=" rounded-2xl w-full object-cover"
            alt={props.car.title}
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
                {getCategoryIcon(props.car.carACF.carCategory)}
              </span>
              {props.car.carACF.carCategory}
            </div>
            <div className="flex items-center gap-1">
              <TbManualGearbox className="text-dark-gray" />
              {props.car.carACF.carType?.[0].substr(0, 1)}
            </div>
            <div className="flex items-center gap-1">
              <MdAirlineSeatReclineNormal className="text-dark-gray" />
              {props.car.carACF.places}
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-900 mb-0">{props.car.carACF.name}</p>
          <div className="flex flex-col">
            <div className="flex-col">
              <p className="mr-2 truncate mb-1">{props.car.carACF.shortDescription}</p>
              <p className="text-md text-gray-800 mt-0">
                <span className="font-bold text-md">{
                  new Intl.NumberFormat('fr-CI', { style: 'currency', currency: 'CFA' }).format(props.car.carACF.price)}&nbsp;
                </span>
                <span className="font-12px">/jr</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}