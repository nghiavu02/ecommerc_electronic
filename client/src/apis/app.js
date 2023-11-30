import axios from '../axios' 

export const apiCategories = () => axios({
    url: '/productcategory/',
    method: 'get'
})
