import React, { useState } from 'react';
import fakeData from '../../fakeData'
import Cart from '../Cart/Cart';
import Product from '../Product/Product'
import './Shop.css'

const Shop = () => {
   const first10 = fakeData.slice(0,10)
   const [products , setProducts] = useState(first10)
   const [cart , setCart] = useState([])
   

   const handlerAddproduct =(product) => {
       const newcart = [...cart,product]
       setCart(newcart)
    }

    return (
        <div className='shop-container'>
            <div className='product-container'>
            <ul>
                {
                    products.map(pr=><Product handlerAddproduct={handlerAddproduct} product={pr}></Product>)
                }
            </ul>
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
            
            
        </div>
    );
};

export default Shop;