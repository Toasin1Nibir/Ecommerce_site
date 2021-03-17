import React from 'react';
import {useState,useEffect} from 'react'
import fakeData from '../../fakeData'
import ReviewItem from '../ReviewItem/ReviewItem'
import { addToDatabaseCart,processOrder,getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart'
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';


const Review = () => {
    const [cart , setCart] = useState([])
    const [orderPlace, setorderPlace] = useState(false)
    const history = useHistory()
    const removeProduct =(productkey)=>{
       console.log("productkey",productkey)
       const newcart = cart.filter(pr => pr.key!== productkey)
       setCart(newcart) 
       addToDatabaseCart(productkey)
    }
    const handlePlaceorder=()=>{
        // setCart([])
        // setorderPlace(true)
        // processOrder()
        history.push('/Shipment')
    }
   
    useEffect(()=>{

        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        const cardProduct = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key )
            product.quantity = savedCart[key]
            return product
        })
         setCart(cardProduct)
    },[])
    let thankyou;
    if(orderPlace){
        thankyou = <img src={happyImage} alt=""/>
    }
   
    return (
        <div className="shop-container">
            <div className="product-container">
            <h1>this is review {cart.length}</h1>
            {
                cart.map(pd => <ReviewItem removeProduct={removeProduct} key ={pd.key} product={pd}></ReviewItem>)
            }
            {
                thankyou
            }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handlePlaceorder} className='main-button'>Place order</button>
                </Cart>
            </div>
           
        </div>
    );
};

export default Review;