import React, { useState } from "react";
import {FiMenu} from 'react-icons/fi';
import {AiOutlineClose} from 'react-icons/ai';

import LOGO from "../assets/images/mela-logo.png";

const ListItem = ({ title, handleClick , className}) => (
  <li onClick={handleClick} className='h-full'>
    <a className={className} href={`#${title}`}>{title}</a>
  </li>
);

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex justify-between py-2 px-4 items-center">
      
      <div className="flex justify-start items-center pl-2 cursor-pointer">
        <img src={LOGO} alt="logo" className="w-28" />
      </div>

      <ul className="w-[58%] md:flex justify-evenly hidden items-end ">
        {["Home", "Contacts", "About"].map((item, i) => (
          <ListItem key={i} title={item} className='text-white font-bold cursor-pointer'/>
        ))}
      </ul>

      <div className="relative md:hidden">
      {toggle ? <AiOutlineClose fontSize={28} className='text-[#91CCFB] mr-4' onClick={()=>setToggle(false)}/> : <FiMenu fontSize={28} className='text-[#91CCFB] mr-4' onClick={()=>setToggle(true)}/>}
      {toggle && (
        <ul className="flex flex-col items-start p-6 fixed top-0 right-0 bottom-0 w-[75vw] z-10 white-glassmorphism animate-slide-in" >
          <li className="w-full m-2 pr-4 flex justify-end"><AiOutlineClose fontSize={28} className='text-[#91CCFB]' onClick={()=>setToggle(false)}/></li>
          {["Home", "Contacts", "About"].map((item, i) => (
            <ListItem key={i} title={item} handleClick={()=>setToggle(false)} className='text-[#91CCFB] text-3xl font-bold cursor-pointer'/>
          ))}
      </ul>
      )}
      </div>

    
    </nav>
  );
};

export default Navbar;
