import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product'
import './Shop.css'
import {getDatabaseCart} from '../../utilities/databaseManager'
import {Link } from "react-router-dom";

const Shop = () => {
   const first10 = fakeData.slice(0,10)
  
   const [products , setProducts] = useState(first10)
   const [cart , setCart] = useState([])

   useEffect(()=>{
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        const previousCart = productKeys.map(pdkey =>{
            const product = fakeData.find(pd => pd.key === pdkey)
            product.quantity = savedCart[pdkey]
            return product
        })
        setCart(previousCart)
       
   }, [])
   

   const handlerAddproduct =(product) => {
        const tobeAdded = product.key
       const sameProduct = cart.find(pd => pd.key === tobeAdded )
       let count = 1
       let newCart 
       if(sameProduct) {
            count = sameProduct.quantity + 1 
            sameProduct.quantity = count
           const others = cart.filter(pd => pd.key !== tobeAdded)
            newCart = [...others, sameProduct] 
       }else{
        product.quantity = 1 
        newCart = [...cart, product] 
       }

       
       setCart(newCart)
       
      
       addToDatabaseCart(product.key,count)
    }

    return (
        <div className='shop-container'>
            <div className='product-container'>
            <ul>
                {
                    products.map(pr=><Product showAddtoCart={true} key={pr.key} handlerAddproduct={handlerAddproduct} product={pr}></Product>)
                }
            </ul>
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                <Link to="/review">
            <button class='main-button'>Review order</button>
            </Link>
                </Cart>
            </div>
            
            
        </div>
    );
};

export default Shop;