import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    // console.log(props)
    const {img ,name,seller,price , stock}= props.product
    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>
        <div className=''>
            <h1 className='product-name'>{name}</h1>
            <br/>
            <p><small>By: {seller}</small></p>
            <br/>
            <p>${price}</p>
            <br/>
            <p><small>Only {stock} available soon</small></p>
            <button className='main-button'
            onClick={()=>props.handlerAddproduct(props.product)}>
                <FontAwesomeIcon icon={faShoppingCart} />add to cart
            </button>

            
        </div>
        </div>
       
    );
};

export default Product;