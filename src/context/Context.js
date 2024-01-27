import React, { useContext, useReducer } from 'react'
import { createContext } from 'react'
import {faker} from '@faker-js/faker'
import {cartReducer}from './Reducer'
import { productReducer } from './Reducer'

export const cart = createContext()
function Context({children}) {
    const products = [...Array(21)].map(() => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.avatarLegacy(),
        inStock: faker.helpers.arrayElement([0, 3, 5, 7,8]),
        fastDelivery: faker.datatype.boolean(),
        rating: faker.helpers.arrayElement([1, 2, 3, 4, 5])
    }));
    
    const [state, dispatch] = useReducer(cartReducer, {
        products:products,
        cart:[]

    })

    const [productState, productDispatch] = useReducer(productReducer, {
       byStock:false,
       byFastDelivery:false,
       byRating:0,
       searchQuery:"",

    })
    

  return (
   <cart.Provider value={{state, dispatch, productState, productDispatch}}> 
    {children}
   </cart.Provider>
  )
}

export default Context


export const CartState = ()=>{
    return useContext(cart)
}
