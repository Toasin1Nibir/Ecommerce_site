import React from 'react';

const ReviewItem = (props) => {
    console.log(props)
    const {name, quantity,key,price} = props.product
    const reviewStyle ={
        border: '1px solid gray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '150px'
    }
    return (        
        <div style={reviewStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p><small>price:{price}</small></p>
            <p>quantity: {quantity}</p>
            <br/>
            <button onClick={() => props.removeProduct(key)} className="main-button">remove</button>
        </div>
    );
};

export default ReviewItem;