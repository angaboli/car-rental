"use client";
import logo from '../public/logo.svg'
import { TbMenuDeep } from "react-icons/tb"
import Link from 'next/link'
import { IoClose } from "react-icons/io5"
import { useState } from "react"
import  Hamburger  from "hamburger-react"
import { Drawer } from "@material-tailwind/react"
import { CgProfile } from "react-icons/cg";
import { MdOutlineCarRental } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { FcAbout } from "react-icons/fc";
import { GiCarWheel } from "react-icons/gi";

const Header = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <header className="shadow-3xl sticky top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/70">
        <div className="wrapper flex justify-between items-center">
          <a href="/" className="p-3">
            {/* <img src={logo.src} width={231} height={80} alt="COCO GO Logo" /> */}
            <picture>
              <source media="(min-width: 992px)" width={231} height={80} srcset={logo.src} type="image/svg+xml" />
              <source media="(max-width: 991px)" width={180} height={62} srcset={logo.src} type="image/svg+xml" />
              <img width={231} height={80} src={logo.src} alt="COCO GO Logo" />
            </picture>
          </a>
          <div className="flex flex-between gap-5 items-center">
            <div className="flex items-center gap-[30px]">
              <ul className="menu hidden md:inline-flex menu-horizontal bg-light-gray rounded-box">
                <li><a className="hover:bg-blue-green hover:text-light-gray" href="/#reservez">Réservez</a></li>
                <li><a className="hover:bg-blue-green hover:text-light-gray" href="/#processus">Processus</a></li>
                <li><a className="hover:bg-blue-green hover:text-light-gray" href="#contact">Contact</a></li>
              </ul>
              {/* <button className="btn_base py-1 px-3 rounded bg-gradient-to-r from-cyan-700 to-cyan-500  text-light-gray hover:text-light-dark-gray hover:bg-primary-black">
                <Link href="/reservation" className="xs:hidden  flex items-center gap-2 ">
                  <MdOutlineCarRental />
                  <span>Je réserve</span>
                </Link>
              </button> */}
            <div className="md:hidden">
              <Hamburger color="#05A3AB" size={24} toggled={isOpen} toggle={setOpen} />
                {isOpen && (
                  <div className="absolute top-full right-2">
                    <ul className="menu my-2 menu-vertical bg-light-gray rounded-box ">
                      <li><a className="hover:bg-blue-green hover:text-light-gray" href="/#decouvrez">Découvrez</a></li>
                      <li><a  className="hover:bg-blue-green hover:text-light-gray" href="/#categories">Catégories</a></li>
                      <li><a  className="hover:bg-blue-green hover:text-light-gray" href="/#processus">Processus</a></li>
                      <li><a  className="hover:bg-blue-green hover:text-light-gray" href="#contact">Contact</a></li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
  )

}

export default Header;