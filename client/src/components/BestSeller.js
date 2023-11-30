import React,{useEffect, useState} from "react";
import { apiGetProduct } from "../apis/product";
import {Product} from './'
import Slider from "react-slick";

const tabs = [
    {id: 1, name: 'Best Seller'},
    {id: 2, name: 'New Arrivals'},
    {id: 3, name: 'Tablet'},
]
const arr = [1,2,3,4,5,6,7,8]
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
const BestSeller = () =>{
    const [bestsellers, setBestSellers] = useState([])
    const [newProduccts, setNewProducts] = useState([])
    const [actived, setActived] = useState(1)
    const fetchProduct = async ()=>{
        const response = await Promise.all([apiGetProduct({sort: '-sold'}), apiGetProduct({sort: '-createAt'})])
        if(response[0]?.success) setBestSellers(response[0].products)
        if(response[1]?.success) setNewProducts(response[1].products)
    }
    useEffect(()=>{
        fetchProduct()
    },[])
    return (
        <div>
            <div className="uppercase font-semibold text-[20px] pb-4 mb-6 border-b-2 border-main" >
            {tabs?.map((item) => (
                <span onClick={()=> setActived(item.id)} className={`pr-8 cursor-pointer  ${actived == item.id ? 'opacity-100': 'opacity-50'} `}>{item.name}</span>
            ))}
            </div>
            <div className="w-full ">
                <Slider {...settings} className="mr-[-20px]">
                    {bestsellers?.map((item, index) => (
                       <Product key={item.id} productData={item}  className=""/>
                        
                    ))} 
                    
                </Slider>
            </div>
        </div>
    )
}

export default BestSeller


