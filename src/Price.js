import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

export default function Price(props) {
    const [price, setPrice] = useState(0)
    const [currencies, setCurrencies] = useState(0)
    const [activeCurrency, setCurrency] = useState(0)

    useEffect(() => {
        let userId = props.userId

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
                    if (window.configurator) {
                        let currentPrice = window.configurator.getPrice(pricebook.id, pricebook.currencies[0])
                        if (currentPrice !== price) {
                            setPrice(currentPrice)
                        }
                        const privateConfig = window.player.enableApi('player').getConfigurator()
                        privateConfig.on('setConfiguration', config => setPrice(window.configurator.getPrice(pricebook.id, pricebook.currencies[0])));
                    }
                }
            })
            .catch(error => console.log('error', error));


    }, [price])

    return (
        <>{price > 0 ? (
            <Box style={{
                margin: "auto",
                width: "100%",
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                position: 'sticky',
                bottom: "0px",
                padding: "10px"
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
        ) : null}        </>
    )
}