import React, { useState, useEffect } from 'react';
import ProductListCard from './ProductListCard';
import { useParams } from 'react-router-dom';

export default function Listing(props) {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});

    let { id, name, publicToken } = useParams();
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        console.log(`https://admin.demo.threekit.com/products/${id}`)
        fetch(`https://admin.demo.threekit.com/products/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setProducts(result.products)
            })
            .catch(error => console.log('error', error));

    }
        , [props.match.params.id]);

    console.log(products)
    return (
        <>
            <h5>Product list</h5>
            {

                products.map((product) => {
                    return <ProductListCard product={product} userId={id} />
                })
            }
        </>
    )
}