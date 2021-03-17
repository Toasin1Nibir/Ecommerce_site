import React from 'react';
import {useParams} from 'react-router-dom'
import Product from '../Product/Product'
import fakeData from '../../fakeData'
const ProductDetail = () => {
    const {ProductKey} = useParams()
    const product = fakeData.find(pd => pd.key === ProductKey) 
    console.log(product)
    return (
   
        <div>
            <h1>{ProductKey} Detail Coming sooon</h1>
            <Product showAddtoCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;