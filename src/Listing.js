import React, { useState } from 'react';
import ProductListCard from './ProductListCard';

export default function Listing() {
    const products = [
        {
            name: 'Chair',
            description: 'A totally rad chair',
            image: 'https://i.imgur.com/nOmEk5S.jpg'
        },
        {
            name: 'Desk',
            description: 'A totally rad Desk',
            image: 'https://i.imgur.com/nOmEk5S.jpg'
        },
        {
            name: 'Barn',
            description: 'A totally rad Barn',
            image: 'https://i.imgur.com/nOmEk5S.jpg'
        },
        {
            name: 'House',
            description: 'A totally rad House',
            image: 'https://i.imgur.com/nOmEk5S.jpg'
        },
        {
            name: 'Box',
            description: 'A totally rad Box',
            image: 'https://i.imgur.com/nOmEk5S.jpg'
        },
    ]

    return (
        <>
            <h5>Product list</h5>
            {
                products.map((product) => {
                    return <ProductListCard product={product} />
                })
            }
        </>
    )
}