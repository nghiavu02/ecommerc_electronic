import React from "react";
import {formatMoney,renderStar} from '../ultils/helper'

const ProductCart = ({productData}) =>{
    console.log(productData)
    return (
        <div className=" w-1/3  flex flex-auto px-[8px] mb-5">
            <div className="border flex  items-center w-full px-[8x]">
                <span className="mr-8  h-[125px] flex justify-center items-center">
                    <img src={productData?.thumb} alt="ảnh"  className="w-[80px] object-contains"/>
                </span>
                <div>
                    <div>{productData.title}</div>
                    <div className="flex my-2 ">
                                {renderStar(productData.totalRating)}
                            </div>
                    <div className="text-main1 font-[600]">{`${formatMoney(productData?.price)} VNĐ`}</div>
                </div>
            </div>
        </div>
    )
}

export default ProductCart