import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import data from './components/Form/data'
import { useParams } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


export default function Landing(props) {
    const [product, setProduct] = useState({})
    const [attributes, setAttributes] = useState(null)
    const [price, setPrice] = useState(0)
    const [currencies, setCurrencies] = useState(0)
    const [activeCurrency, setCurrency] = useState(0)

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
                    console.log("########################################", result)
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

                    var myHeaders = new Headers();
                    myHeaders.append("Authorization", "Bearer 34613bc7-dd6d-41f3-b1e0-6098b29b5d1a");

                    var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        redirect: 'follow'
                    };

                    fetch("https://admin.demo.threekit.com/pricebook/" + userId, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            let pricebook = result.pricebooks.filter((book) => {
                                return book.name.toLowerCase() === 'website'
                            })

                            if (pricebook) {
                                pricebook = pricebook[0]
                                let currentPrice = window.configurator.getPrice(pricebook.id, pricebook.currencies[0])
                                if (currentPrice !== price) {
                                    setPrice(currentPrice)
                                }

                                console.log(price)
                            }
                        })
                        .catch(error => console.log('error', error));


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
            <Box style={{
                margin: "auto",
                width: "100%",
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                position: 'fixed',
                bottom: "5px"
            }}>
                <Paper elevation={6} style={{
                    borderRadius: "10px",
                    backgroundColor: "#3f51b5"
                }}>
                    <h2 style={{
                        margin: "10px",
                        color: "white"
                    }}>Price: ${price}</h2>
                </Paper>
            </Box>
        </>
    )
}
