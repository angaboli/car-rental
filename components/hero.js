"use client";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import { TbCarSuv } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";

const Hero = () => {

  const [openTab, setOpenTab] = useState(1);
  const [sameAgency, setSameAgency] = useState(true);

  const handleCheckboxChange = (e) => {
    setSameAgency(e.target.checked);
  }

  return (
    <div className="bg-light-gray bg-gradient-to-r from-gray-200 to-slate-300">
      <div className="wrapper  min-h-[444px]">
        <h1 className="head_text xs:w-full sm:w-1/2 mx-auto mb-10 pt-28 text-center uppercase">Le confort sur quatre roues,
          <br className="sm:hidden" />&nbsp;
          <span className="text-primary-black font-light">juste pour vous.</span>
        </h1>
        {/* <div className="flex flex-wrap mx-auto items-center mt-5 gap-5"> */}
        <div className="flex flex-col">
          <div className="md:w-1/2 xs:w-full sm:w-2/3 lg:w-1/2 xl:w-1/4 2xl:w-1/3 mb-4 xs:text-xs sm:text-sm md:text-base flex space-x-4 p-1 bg-transparent rounded-lg shadow-md">
            <button
              onClick={() => setOpenTab(1)}
              className={`flex-1 py-2 px-4 rounded-md focus:outline-none items-center flex gap-2 focus:shadow-outline-blue transition-all duration-300 ${openTab === 1 ? 'bg-blue-green text-white' : ''}`}
            >
              <FaCar />
              Berline
            </button>
            <button
              onClick={() => setOpenTab(2)}
              className={`flex-1 py-2 px-4 rounded-md focus:outline-none items-center flex gap-2 focus:shadow-outline-blue transition-all duration-300 ${openTab === 2 ? 'bg-blue-green text-white' : ''}`}
            >
              <TbCarSuv />
              SUV
            </button>
            <button
              onClick={() => setOpenTab(3)}
              className={`flex-1 py-2 px-4 rounded-md focus:outline-none items-center flex gap-2 focus:shadow-outline-blue transition-all duration-300 ${openTab === 3 ? 'bg-blue-green text-white' : ''}`}
            >
              <IoCarSportOutline />
              Prestige
            </button>
          </div>
          <div className={`relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 xs:text-xs sm:text-xs md:text-sm gap-4`}>
            <div className="">
              <div className="flex">
                <label
                  forhtml="recup"
                  className="mb-3 mr-8 block text-base font-medium text-[#07074D]"
                >
                  Lieu de récuperation
                </label>
                {/* <label forhtml="sameAgency"
                  className="mb-3 block text-base font-medium text-[#07074D]">
                  Retour dans la même agence
                  <input id="sameAgency" className="absolute opacity-0 left-0 top-0 mr-5 cursor-pointer" type="checkbox" checked={sameAgency} onChange={handleCheckboxChange} />
                  <span className="h-6 w-6 checkmark absolute top-0 left-0 bg-dark-gray"></span>
                </label> */}
                <label
                  className="relative flex cursor-pointer items-center rounded-full mb-3 text-base font-medium text-[#07074D]"
                  htmlFor="checkbox-1"
                  data-ripple-dark="true"
                >
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 mr-2  cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity border-blue-green checked:bg-blue-green checked:before:bg-blue-green hover:before:opacity-10"
                    id="checkbox-1"
                    checked={sameAgency}
                    onChange={handleCheckboxChange}
                  />
                  <div className="pointer-events-none absolute left-1 top-2/4  -translate-y-2/4  text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  Retour a l'agence
                </label>
              </div>
              <div className="main-search mb-8 rounded-lg shadow-md focus:shadow-lg px-6 py-3 w-full flex items-center space-x-6 border border-gray-200 border-opacity-75">
                <input id="recup" x-ref="search" type="text" placeholder="Lieu de récuperation" className="text-base w-full bg-transparent focus:outline-none" />
                <CiLocationOn />
              </div>
            </div>
            <div>
              <label
                forhtml="date"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Date de départ
              </label>
              <div className="main-search mb-8 rounded-lg shadow-md focus:shadow-lg px-6 py-3 w-full flex items-center space-x-6 border border-gray-200 border-opacity-75">
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="w-2/3 rounded-md border-none bg-transparent  text-base font-medium text-[#6B7280] outline-none focus:outline-none "
                />
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="w-1/3 rounded-md border-none bg-transparent  text-base font-medium text-[#6B7280] outline-none focus:outline-none "
                />
              </div>
            </div>
            <div>
              <label
                forhtml="date"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Date de retour

              </label>
              <div className="main-search mb-8 rounded-lg shadow-md focus:shadow-lg px-6 py-3 w-full flex items-center space-x-6 border border-gray-200 border-opacity-75">

                <input
                  type="date"
                  name="date"
                  id="date"
                  className="w-2/3 rounded-md border-none bg-transparent  text-base font-medium text-[#6B7280] outline-none focus:outline-none "
                />
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="w-1/3 rounded-md border-none bg-transparent  text-base font-medium text-[#6B7280] outline-none focus:outline-none "
                />
              </div>
            </div>


          </div>
          <div className="flex justify-end text-center">
            <button className="btn_base sm:w-full md:w-1/2 lg:w-1/4 primary_btn mb-10">Choisir ma voiture</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;