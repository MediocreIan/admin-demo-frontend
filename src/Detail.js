import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import data from './components/Form/data'
import { useParams } from 'react-router-dom'

export default function Landing(props) {
    const [product, setProduct] = useState({})
    const [attributes, setAttributes] = useState(null)
    let { userId, productId } = useParams()


    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }
        if (Object.keys(product).length === 0) {
            fetch(
                `https://admin.demo.threekit.com/product/${userId}/${productId}`,
                requestOptions
            )
                .then(response => response.json())
                .then(result => {
                    setProduct(result)
                })
                .catch(error => console.log('error', error))
        }
        if (!product.publicToken) {
            return
        } else {
            window
                .threekitPlayer({
                    authToken: product.publicToken,
                    el: document.getElementById('player'),
                    assetId: product.id,
                    showConfigurator: false,
                    showAR: true
                })
                .then(async api => {
                    window.player = api
                    window.configurator = await api.getConfigurator()
                    await api.when('loaded')
                    if (attributes === null) {
                        setAttributes(window.configurator.getDisplayAttributes())
                    }
                })
        }
        return () => {
            if (window.player) {
                window.player.unload()
            }
        }
    }, [product, attributes, props.match.params.userId])
    console.log(product)
    return (
        <>
            <div id='player' style={{
                height: "45vh"
            }}></div>
            {attributes === null || attributes.length === 0 ? null : <Form data={attributes} />}
        </>
    )
}
