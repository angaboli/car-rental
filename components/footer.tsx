import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-primary-black bg-gradient-to-r from-zinc-700 to-gray-500 text-light-gray pt-8 pb-6">
      <div className="wrapper mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 xl:w-6/12 2xl:w-6/12 px-4">
            <h4 className="text-2xl fonat-semibold text-blueGray-700">Restons en contact&nbsp;!</h4>
            <h5 className="mt-0 mb-2 ">
              Retrouvez-nous sur nos resaux sociaux.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <div className="flex  h-10 w-1/3 items-center justify-between rounded-full outline-none focus:outline-none mr-2" >
                <a href="#" target="_blank" className="cursor-pointer">
                  <FaXTwitter className="bg-white p-2 text-neutral-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" />
                </a>
                <a href="#" target="_blank" className="cursor-pointer">
                  <FaFacebookF className="bg-white p-2 text-sky-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" />
                </a>
                <a href="#" target="_blank" className="cursor-pointer">
                  <FaInstagram className="bg-white p-2 text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" />
                </a>
                <a href="#" target="_blank" className="cursor-pointer">
                  <FaYoutube className="bg-white p-2 text-rose-700 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 xl:w-6/12 2xl:w-6/12">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 2xl:w-4/12 px-4 ml-auto mb-4">
                <span className="block uppercase text-tacha text-sm font-semibold mb-2">Liens utile</span>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Decouvrez</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Les dernières nouvelles</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Mon compte</a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 2xl:w-4/12 px-4">
                <span className="block uppercase text-tacha text-sm font-semibold mb-2">Ressources</span>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-tacha font-semibold py-1">
              Copyright © <span id="get-current-year">{currentYear}</span>
              <a href="https://d3cod.com" className="text-tacha hover:text-gold" target="_blank"> COCOGO</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;