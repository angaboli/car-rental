import CarDetails from "./carDetails"
import Form from "./form"
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState, useEffect, useRef } from "react"
import { TbCarSuv } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { Carousel, IconButton  } from "@material-tailwind/react";
import { TbManualGearbox } from "react-icons/tb";
import { MdAirlineSeatReclineNormal } from "react-icons/md";

const BookingModal = ({car} :any) => {

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

  const gallery = car?.gallery || [];
  const frontImage = car?.image?.url;
  const description = { __html: car.description?.html };

  return (
    <form method="dialog"  className="modal-box w-11/12 max-w-7xl bg-light-gray ">
      <div className="relative">
        <div className='border-b-[1px] pb-2 '>
          <h3 className=" text-[30px] font-light text-blue-green">
            Réservez maintenant
          </h3>
        </div>
      </div>
      <div className='flex flex-col md:flex-row md:gap-10 md:p-5'>
        <div className="w-full md:w-2/3">
          {/* <CarDetails car={car} /> */}
          {
            gallery.length !== 0 ?
              <Carousel
                placeholder=""
                className="rounded-xl"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                  <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                          activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}
                prevArrow={({ handlePrev }) => (
                  <IconButton
                    placeholder=""
                    variant="text"
                    color="white"
                    size="md"
                    onClick={handlePrev}
                    className="!absolute top-2/4 left-4 -translate-y-2/4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                  <IconButton
                    placeholder=""
                    variant="text"
                    color="white"
                    size="md"
                    onClick={handleNext}
                    className="!absolute items-center top-2/4 !right-4 -translate-y-2/4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </IconButton>
                )}
              >
                {
                  gallery.map((image:any, index:any) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Slide ${index}`}
                      className="h-full w-full object-cover"
                    />
                  ))
                }
              </Carousel>
          :
          <img
            src={frontImage}
            alt={car.name}
            className="h-full w-full object-cover"
          />
        }
      </div>
      <div className="w-full md:w-1/3">
        {/* <Form car={car} /> */}
          <div className="mt-4 pl-2 mb-2 flex">
            <div className="flex flex-col w-full">
              <div className="flex gap-5 border-y border-light-gray py-2 my-3">
                <div className="flex items-center gap-1">
                  <span className="text-dark-gray">
                    { getCategoryIcon(car.carCategory) }
                  </span>
                  {car.carCategory}
                </div>
                <div className="flex items-center gap-1">
                  <TbManualGearbox className="text-dark-gray" />
                  {car.carType?.substr(0,1)}
                </div>
                <div className="flex items-center gap-1">
                  <MdAirlineSeatReclineNormal className="text-dark-gray" />
                  {car.places}
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-0">{ car.name}</p>
              <div className="flex flex-col">
                <p className="text-md text-gray-800 mt-0">
                  <span className="font-semibold text-md">{
                    new Intl.NumberFormat('fr-CI', { style: 'currency', currency: 'CFA' }).format( car.price) }&nbsp;
                  </span>
                  <span className="font-12px">/jr</span>
                </p>
                <p className="mt-1 mb-1">{car.shortDescription}</p>
              </div>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-plus border border-blue-green bg-base-200">
            <div className="collapse-title text-md font-medium ">
              Description
            </div>
            <div className="collapse-content">
              <div dangerouslySetInnerHTML={description} />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default BookingModal