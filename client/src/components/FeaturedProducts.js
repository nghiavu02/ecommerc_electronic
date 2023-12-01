import React , {useEffect, useState}from "react";
import {ProductCart} from './'
import { apiGetProduct } from "../apis/product";
const FeaturedProducts = () =>{
    const [products, setProducts] = useState(null)

    const fetchProducts = async() =>{
        const response = await apiGetProduct({limit: 9, page: 1, totalRating: 5})
        if(response.success) setProducts(response.products)
    }
    useEffect(() =>{
        fetchProducts()
    }, [])
    console.log(products)
    return (
        <div>
                <div className="text-4 font-semibold  uppercase py-[20px] mb-4 border-b-2 border-main">FEATURED PRODUCTS</div>
                <div className="flex flex-wrap mx-[-8px]">
                    {products?.map(item => (
                            <ProductCart key={item.id} productData={item}/>
                    ))}
                    
                </div>
        </div>
    )
}
export default FeaturedProducts