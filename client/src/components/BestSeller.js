import React,{useEffect, useState} from "react";
import { apiGetProduct } from "../apis/product";
import {Product} from './'
import Slider from "react-slick";

const tabs = [
    {id: 1, name: 'Best Seller'},
    {id: 2, name: 'New Arrivals'},
]
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
const BestSeller = () =>{
    const [bestsellers, setBestSellers] = useState(null)
    const [newProduccts, setNewProducts] = useState(null)
    const [actived, setActived] = useState(1)
    const [products, setProducts] = useState(null)
    const fetchProduct = async ()=>{
        const response = await Promise.all([apiGetProduct({sort: '-sold'}), apiGetProduct({sort: '-createAt'})])
        if(response[0]?.success) {
            setBestSellers(response[0].products)
            setProducts(response[0].products)
        }
        if(response[1]?.success) setNewProducts(response[1].products)
    }
    useEffect(()=>{
        fetchProduct()
    },[])
    useEffect(()=>{
        if(actived == 1) setProducts(bestsellers)
        if(actived == 2) setProducts(newProduccts)
    },[actived])
    return (
        <div>
            <div className="uppercase font-semibold text-[20px] pb-4 ml-[-32px] " >
            {tabs?.map((item) => (
                <span onClick={()=> setActived(item.id)} className={`px-8 cursor-pointer border-r  ${actived == item.id ? 'opacity-100': 'opacity-50'} `}>{item.name}</span>
            ))}
            </div>
            <div className="w-full border-t-2 border-main pt-6" >
                <Slider {...settings} className="mr-[-20px]">
                    {products?.map((item, index) => (
                       <Product key={item.id} productData={item} isNew={actived == 1 ? false : true}  className=""/>
                        
                    ))} 
                    
                </Slider>
            </div>
        </div>
    )
}

export default BestSeller


