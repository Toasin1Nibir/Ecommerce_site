import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const Product = (props) => {
     console.log(props)
    const {img ,name,seller,price , stock,key}= props.product
    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>
        <div className=''>
            <h1 className='product-name'><Link to={"/Product/"+key}>{name}</Link></h1>
            <p><small>By: {seller}</small></p>
            <br/>
            <p>${price}</p>
            <br/>
            <p><small>Only {stock} available soon</small></p>
            { props.showAddtoCart &&
                  <button className='main-button'
                  onClick={()=>props.handlerAddproduct(props.product)}>
                      <FontAwesomeIcon icon={faShoppingCart} />add to cart
                  </button>
            }
          
        </div>
        </div>
       
    );
};

export default Product;