import { MdOutlineCarRental } from "react-icons/md";
import Link  from "next/link";

interface ButtonReserveProps {
  label: string;
  link?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  id?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const ButtonMain: React.FC<ButtonReserveProps> = ({ label, link, onClick, className, id, disabled , type = "button" }) => {

  const buttonContent = (
    <>
      <MdOutlineCarRental className="z-40 transition-all duration-300 group-hover:translate-x-1 hover:text-light-gray" />
      <span className="z-40 hover:text-primary-black">{label}</span>
      <div className="hidden md:block absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"></div>
    </>
  );
  const pointer = disabled ? 'bg-slate-300 cursor-not-allowed' : 'cursor-pointer bg-gradient-to-r from-[#B38425] to-[#D6B456]' ;

  // Conditionnellement rendre un Link ou un Button basé sur la présence de 'link'
  return link ? (
    <Link href={link}>
      <button disabled={disabled} className={`${className} ${pointer} float-right group overflow-hidden btn_base py-2 px-3 rounded items-center flex gap-2  text-light-gray  hover:bg-primary-black hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0`}>
        {buttonContent}
      </button>
    </Link>
  ) : (
    <button id={id} disabled={disabled} type={type} onClick={onClick} className={`${className} ${pointer} float-right group overflow-hidden btn_base py-2 px-3 rounded items-center flex gap-2  text-light-gray hover:text-primary-black hover:bg-primary-black hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0`}>
      {buttonContent}
    </button>
  );
};

export default ButtonMain;