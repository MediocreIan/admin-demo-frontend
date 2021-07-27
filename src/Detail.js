import React, { useState, useEffect } from 'react';
import Form from "./components/Form"
import data from "./components/Form/data"
import { useParams } from 'react-router-dom';


export default function Landing(pro) {
    const [product, setProduct] = useState({});
    const [attributes, setAttributes] = useState([]);

    let { userId, productId } = useParams();


    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        if (Object.keys(product).length === 0) {
            fetch(`https://admin.demo.threekit.com/product/${userId}/${productId}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setProduct(result)
                })
                .catch(error => console.log('error', error))
        }
        window
            .threekitPlayer({
                authToken: product.publicToken,
                el: document.getElementById("player"),
                assetId: product.id,
                showConfigurator: false,
                showAR: true,
            })
            .then(async (api) => {
                window.player = api;
                window.configurator = await api.getConfigurator();
                await api.when("loaded");
                if (attributes.length === 0) {
                    setAttributes(window.configurator.getDisplayAttributes())
                }
            })
        console.log(attributes)
    }

        , [product, attributes]);
    console.log(product)
    return (
        <>
            <div id='player'></div>
            {
                attributes.length === 0 ? null : <Form data={attributes} />

            }

        </>
    )
}