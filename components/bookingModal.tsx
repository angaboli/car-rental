import CarDetails from "./carDetails"
import Form from "./form"
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState, useEffect, useRef } from "react"
import { TbCarSuv } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { Carousel, IconButton } from "@material-tailwind/react";
import { TbManualGearbox } from "react-icons/tb";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { MdOutlineCarRental } from "react-icons/md";
import Link from "next/link";
import ButtonMain from '@/components/buttonMain';
import { useCars } from '@/contexts/carsContext';
import { Tooltip } from "@material-tailwind/react";
import { BsInfoCircleFill } from "react-icons/bs";
import { Gallery } from '@/types'


const BookingModal = ({ car }: any) => {
  //const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY || "";
  const { isAvailable } = useCars();
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

  const gallery = car?.carACF?.gallery || [];
  const frontImage = car?.carACF?.image?.node.sourceUrl || "";
  const description = { __html: car.carACF?.description } || "";

  function getImageUrls(gallery: Gallery): { id: number, url: string }[] {
    let urls: { id: number, url: string }[] = [];
    for (let i = 1; i <= 5; i++) {
      const imgKey = `img${i}` as keyof Gallery;
      const imageNode = gallery[imgKey];
      if (imageNode && imageNode.node) {
        urls.push({ id: imageNode.node.id, url: imageNode.node.sourceUrl });
      }
    }
    return urls;
  }

  const galleryUlrs = getImageUrls(gallery);

  return (
    <form method="dialog" className="modal-box w-4/5 max-w-7xl bg-light-gray ">
      <div className="relative">
        <div className='border-b-[1px] pb-2 '>
          <h3 className=" text-[30px] font-light text-gold">
            Réservez maintenant
          </h3>
        </div>
      </div>
      <div>
        <div className='flex flex-col md:flex-row md:gap-10 md:p-5'>
          <div className="w-full md:w-3/5">
            {
              galleryUlrs.length !== 0 ?
                <Carousel
                  placeholder=""
                  className="rounded-xl"
                  navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                      {new Array(length).fill("").map((_, i) => (
                        <span
                          key={i}
                          className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
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
                    galleryUlrs.map((image: any, index: any) => (
                      <img
                        key={image.id}
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
                  alt={car.title}
                  className="h-full w-full object-cover"
                />
            }
          </div>
          <div className="w-full md:w-2/5">
            <div className="mt-4 pl-2 mb-2 flex">
              <div className="flex flex-col w-full">
                <div className="flex gap-5 border-y border-light-gray py-2 my-3">
                  <div className="flex items-center gap-1">
                    <span className="text-dark-gray">
                      {getCategoryIcon(car.carACF?.carCategory)}
                    </span>
                    {car.carCategory}
                  </div>
                  <div className="flex items-center gap-1">
                    <TbManualGearbox className="text-dark-gray" />
                    {car.carACF?.carType?.[0].substr(0, 1)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MdAirlineSeatReclineNormal className="text-dark-gray" />
                    {car?.carACF?.places}
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-0">{car.title}</p>
                <div className="flex flex-col">
                  <p className="text-md text-gray-800 mt-0">
                    <span className="font-semibold text-md">{
                      new Intl.NumberFormat('fr-CI', { style: 'currency', currency: 'CFA' }).format(car.carACF?.price)}&nbsp;
                    </span>
                    <span className="font-12px">/jr</span>
                  </p>
                  <p className="mt-1 mb-1">{car.carACF?.shortDescription}</p>
                </div>
              </div>
            </div>
            {
              (typeof (car.carACF?.description) !== 'undefined' && car.carACF?.description !== null) &&
              <div tabIndex={0} className="collapse collapse-plus border border-gold bg-base-200">
                <div className="collapse-title text-md font-medium ">
                  Description
                </div>
                <div className="collapse-content">
                  <div dangerouslySetInnerHTML={description} />
                </div>
              </div>
            }
          </div>
        </div>
        <div className="modal-action">
          <button className="btn_base btn_base primary_btn">Fermer</button>
          {
            isAvailable ?
              typeof (car.id) !== 'undefined' && car.id !== null &&
              <ButtonMain label='Je reserve' link={`/reservation/${car?.id}`} className='py-3 px-6 uppercase ' />
              :
              <div className="float-right z-50">
                <Tooltip id="#reservez" className="" content='Veuillez remplir le formulaire pour voir les voitures disponibles.'>
                  <button>
                    <sup>
                      <BsInfoCircleFill className="text-gold text-xl ml-3 cursor-none" />
                    </sup>
                  </button>
                </Tooltip>
              </div>
          }
        </div>
      </div>
    </form>
  )
}

export default BookingModal