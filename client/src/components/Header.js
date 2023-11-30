import React from "react";
import logo from '../assets/img/logo.png'
import icons from "../ultils/icon";
import { Link } from "react-router-dom";
import path from '../ultils/path'
const Header = ()=>{
    const {FaPhone,IoMail, FaUser,FaCartShopping} = icons
    return (
        <div className="w-main h-[110px]  py-[35px] flex justify-between">
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt="Logo" className="w-[234px] h-[24px] object-cover"/>
            
            </Link>
            <div className="flex gap-4 text-[13px]">
                <div className="flex flex-col px-4 border-r items-center ">
                    <span className="flex gap-2 items-center">
                        <FaPhone color="red"/>
                        <span className="font-semibold">(+1800) 000 8808</span>
                    </span>
                    <span className="opacity-80">
                        Mon-Sat 9:00AM - 8:00PM
                    </span>
                </div>
                <div className="flex flex-col px-4 border-r items-center">
                    <span className="flex gap-2 0">
                        <IoMail color="red"/>
                        <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
                    </span>
                    <span className="opacity-80">
                        Online Support 24/7
                    </span>
                </div>
                <div class="flex gap-4 items-center px-4 border-r justify-center">
                    <FaCartShopping color="red" className="text-[20px]"/>
                    <span>0 item</span>
                </div>
                <div className="items-center px-4 justify-center">
                    <FaUser color="red" size={24}/>
                </div>
            </div>
        </div>
    )
}

export default Header