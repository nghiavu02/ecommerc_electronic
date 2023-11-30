import React from "react";
import icon from '../ultils/icon'
import {formatMoney} from '../ultils/helper'
const Product = ({productData}) =>{
    const {IoMdStar} = icon
    console.log(productData)
    return (
        <div className="inline-block border mr-5 p-[15px] pt-0 text-[16px]">
               <div className="">
                    <div>
                        <img src={productData?.thumb||''} alt="image" className="w-[295px]  object-cover inline-blocks "/>
                        
                    </div>
                    <div className="mt-4 h-[110px]">
                        <div className="h-[48px]">{productData?.title}</div>
                        <div className="flex my-3">
                            <IoMdStar color="#f1b400"/>
                            <IoMdStar color="#f1b400"/>
                            <IoMdStar color="#f1b400"/>
                            <IoMdStar color="#f1b400"/>
                            <IoMdStar color="#f1b400"/>
                        </div>
                        <div className="text-main1 font-[600]">{`${formatMoney(productData?.price)} VNĐ`}</div>
                    </div>
               </div>
        </div>
    )
}

export default Product