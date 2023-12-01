import React from "react";
const TimerDeal = ({text}) =>{
    return (
        <div className="w-1/3 h-[64px] flex flex-col items-center justify-center border bg-[#f4f4f4]" >
            <span className="text-[18px] font-semibold">0</span>
            <span className="text-[12px] font-[300] opacity-80">{text}</span>
        </div>
    )
}

export default TimerDeal