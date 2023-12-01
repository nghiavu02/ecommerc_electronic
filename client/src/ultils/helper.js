import icons from './icon'
const {IoMdStar, IoIosStarOutline} = icons
export const formatMoney = number =>  Number(number?.toFixed(1)).toLocaleString()

export const renderStar = (number)=>{
    //4 [1,1,1,1,0] 1sao sáng  0 sao trắng
    const stars = []
    for(let i = 0; i <+number; i++){
        stars.push(<IoMdStar color='orange'/>)
    }
    for(let i = 5; i> +number; i--){
        stars.push(<IoIosStarOutline color='orange'/>)
    }
    return stars
}