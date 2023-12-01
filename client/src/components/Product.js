import React, {useState}from "react";
import {formatMoney} from '../ultils/helper'
import newLabel from '../assets/img/new.png'
import trending from '../assets/img/trending.png'
import {renderStar} from '../ultils/helper'
import {SelectOption} from './'
import icons from '../ultils/icon'
const {FaHeart,FaShoppingCart,FaEye} = icons
const Product = ({productData, isNew}) =>{
    const [isShowOption, setIsShowOption] = useState(false)
    return (
        <div onMouseEnter={e => setIsShowOption(true)} onMouseLeave={e => setIsShowOption(false)} className="inline-block border mr-5 p-[15px] pt-0 text-[16px]">
               <div className="">
                    <div className="relative">
                        {isShowOption && <div className="absolute flex left-0 right-0 bottom-0 justify-center gap-2 animate-slide-top">
                            <SelectOption icons={<FaHeart/>}/>
                            <SelectOption icons={<FaShoppingCart/>}/>
                            <SelectOption icons={<FaEye/>}/>
                        </div>}
                        <img src={productData?.thumb||''} alt="image" className="w-[295px]  object-cover inline-blocks p-6"/>
                        <img src={isNew ? newLabel : trending} alt="Image" className="absolute top-0 right-[-15px] z-30 w-[80px] h-[30px]"/>
                    </div>
                    <div className="mt-4 h-[100px]">
                        <div className="h-[48px] hover:text-main capitalize">{productData?.title}</div>
                        <div className="flex my-3 ">
                            {renderStar(productData.totalRating)}
                        </div>
                        <div className="text-main1 font-[600]">{`${formatMoney(productData?.price)} VNĐ`}</div>
                    </div>
               </div>
        </div>
    )
}

export default Product