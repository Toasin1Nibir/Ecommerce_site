import React from 'react';


const Cart = (props) => {
    const cart = props.cart
   
    // const total = cart.reduce((total,prd)=> total+prd.price,0)
     let total = 0
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity
        debugger
      
    }

    let shipping = 0
    if(total>35){
        shipping = 0
    }
    else if(total>15){
        shipping = 4.99
    }
    else if(total>0){
        shipping = 12.99
    }
    const tax = (total * 0.1)

    const formatNumber = num => {
        const precision = num.toFixed(2)
        return precision
    }
    return (
        <div>
            <h3>cart</h3>
            <h4>Order summary </h4>
            <p>Items order {cart.length}</p>
            <p>Product price: {formatNumber(total)}</p>
            <p>Shipping price: {formatNumber(shipping)} </p>
            <p><small>Tax+vat: {formatNumber(tax)}</small></p>
            <p>Total price : {formatNumber(total+shipping+tax)}</p>
            <br/>
            { props.children}
            
            
           
        </div>
    );
};

export default Cart;