import React from "react";
import {navigation} from '../ultils/contants'
import { NavLink } from "react-router-dom";
const Navigation = ()=>{
    return (
        <div className="py-2 w-main h-[48px] border-y flex items-center gap-9 text-sm mb-6">
            {navigation?.map(item =>(
                <NavLink to={item.path} key={item.id} className={({isActive})=> isActive ? 'text-main hover:text-main' : 'hover:text-main'}>
                    {item.value}
                </NavLink>
            ))}
        </div>
    )
}

export default Navigation