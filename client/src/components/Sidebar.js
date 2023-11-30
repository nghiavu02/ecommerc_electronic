import React, {useEffect, useState} from "react";
import { apiCategories } from "../apis/app";
import {NavLink, useRoutes} from 'react-router-dom'
import {useSelector} from 'react-redux'
const Sidebar = ()=>{
    const {categories} = useSelector((state) => state.app)
    return (
        <div className="flex flex-col  justify-center border">
            {categories?.map(item =>(
                <NavLink to={item.slug} key={item.slug} className={({isActive})=> isActive ?'text-main h-[55px] px-5 pt-[15px] pb-[14px] text-sm' : 'hover:text-main h-[55px] px-5 pt-[15px] pb-[14px] text-sm'}>
                    {item.name}
                </NavLink>
            ))}
        </div>
    )
}

export default Sidebar