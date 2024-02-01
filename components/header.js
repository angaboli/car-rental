"use client";
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
    <header className="shadow-3xl sticky top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/50">
        <div className="wrapper flex justify-between items-center">
          <a href="/">
            <img src="logo.svg" width={100} height={100} alt="Ivoire Wheels Logo " />
          </a>
          <div className="flex flex-between gap-5 items-center">
            <div className="flex items-center gap-[30px]">
              <ul className="menu hidden md:inline-flex menu-horizontal bg-light-gray rounded-box">
                <li><a className="hover:bg-blue-green hover:text-light-gray" href="/#decouvrez">Découvrez</a></li>
                <li><a className="hover:bg-blue-green hover:text-light-gray" href="/#categories">Catégories</a></li>
                <li><a className="hover:bg-blue-green hover:text-light-gray" href="/#processuss">Processus</a></li>
                <li><a className="hover:bg-blue-green hover:text-light-gray" href="#contact">Contact</a></li>
              </ul>
              <button className="btn_base py-1 px-3 rounded bg-gradient-to-r from-cyan-700 to-cyan-500  text-light-gray hover:text-light-dark-gray hover:bg-primary-black">
                <Link href="/reservation" className="xs:hidden  flex items-center gap-2 ">
                  <MdOutlineCarRental />
                  <span>Je réserve</span>
                </Link>
              </button>
            <div className="md:hidden">
              <Hamburger className="" color="#05A3AB" size={24} toggled={isOpen} toggle={setOpen} />
                {isOpen && (
                  <div className="absolute top-full right-2">
                    <ul className="menu my-2 menu-vertical bg-light-gray rounded-box ">
                      <li><a className="hover:bg-blue-green hover:text-light-gray" href="/#decouvrez">Découvrez</a></li>
                      <li><a  className="hover:bg-blue-green hover:text-light-gray" href="/#categories">Catégories</a></li>
                      <li><a  className="hover:bg-blue-green hover:text-light-gray" href="/#processuss">Processus</a></li>
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