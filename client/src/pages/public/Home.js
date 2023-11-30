import React, {useEffect, useState} from "react";
import { Banner, Sidebar, BestSeller} from "../../components"
const Home = ()=>{
    return (
        <div className="w-main flex gap-0">
            <div className="flex flex-col gap-5 w-[24%] flex-auto ">
                <Sidebar />
                <span>Deal Daily</span>
            </div>
            <div className="flex flex-col gap-5 pl-6 w-[76%] flex-auto">
                <Banner/>
                <BestSeller/>
            </div>
        </div>
    )
}
export default Home