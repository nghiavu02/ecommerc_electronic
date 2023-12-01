import React from "react";
import { Banner, Sidebar, BestSeller, DealDaily, FeaturedProducts} from "../../components"

const Home = ()=>{
    return (
        <div>
            <div className="w-main flex gap-0">
                <div className="flex flex-col gap-5 w-[25%] flex-auto ">
                    <Sidebar />
                    <div className="h-full">
                        <DealDaily/>
                    </div>
                </div>
                <div className="flex flex-col gap-5 pl-6 w-[75%] flex-auto">
                    <Banner/>
                    <BestSeller/>
                    <div className="flex justify-between">
                    <a href="https://www.youtube.com/watch?v=Dnj5FglKgKk"> <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657" alt="Banner"/></a>
                        <a href="https://www.youtube.com/watch?v=Dnj5FglKgKk"><img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657" alt="Banner"/></a>
                    </div>
                </div>
            </div>
            <div>
                <FeaturedProducts/>
            </div>
        </div>
    )
}
export default Home