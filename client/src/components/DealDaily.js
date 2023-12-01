import React, {useCallback, useEffect, useState} from "react";
import icons from '../ultils/icon'
import {apiGetProduct} from '../apis/product'
import {formatMoney,renderStar} from '../ultils/helper'
import {TimerDeal} from './'
const DealDaily = ()=>{
    const {IoMdStar,MdOutlineMenu} = icons
    const [product, setProduct] = useState([])
    const fetchProduct = async() =>{
        const response = await apiGetProduct({limit: 1,page: Math.round(Math.random() * 10), totalRating: 5})
        if(response.success)  setProduct(response.products[0])
    }

    useEffect(()=>{
        fetchProduct()
    },[])
    return (
        <div className="border w-full h-full p-5">
            <div className="flex" >
                <span className="flex flex-1 text-[26px] justify-center items-center" >
                    <IoMdStar color="#d11"/>
                </span>
                <span className=" flex flex-8 justify-center items-center font-semibold uppercase">DAILY DEALS</span>
                <span className="flex-1"></span>
            </div>
            <img src={product?.thumb || ''} className="w-full object-contain mt-[40px] mb-[20px]"/>
            <div className="mt-4 h-[100px] flex flex-col justify-center items-center">
                <div className="h-[52x] hover:text-main ">{product?.title}</div>
                <div className="flex my-3 text-[24px]">
                    {renderStar(product.totalRating)}
                </div>
                <div className="font-[400]">{`${formatMoney(product?.price)} VNĐ`}</div>
            </div>
            <div>
                <div className="flex mt-4 gap-2">
                    <TimerDeal text={'Hours'} />
                    <TimerDeal text={'Minutes'}/>
                    <TimerDeal text={'Seconds'}/>
                </div>
                <button type="button" className="flex justify-center items-center w-full h-10 mt-4 bg-[#EE3131] text-[#fff] gap-4 text-[14px] hover:bg-[#222121]">
                    <span><MdOutlineMenu/></span>
                    <span>Options</span>
                </button>
            </div>
        </div>
    )
}

export default DealDaily