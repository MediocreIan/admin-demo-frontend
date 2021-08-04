import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

export default function Price (props) {
  const [price, setPrice] = useState(0)
  const [currencies, setCurrencies] = useState(0)
  const [activeCurrency, setCurrency] = useState(0)
  const [attributes, setAttributes] = useState(props.attributes)
  const [pricebook, setPricebook] = useState(null)

  useEffect(() => {
    console.log('RELOAD')
    // setAttributes(props.attributes)
    let userId = props.userId

    var myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      'Bearer 34613bc7-dd6d-41f3-b1e0-6098b29b5d1a'
    )

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    if (!pricebook) {
      fetch(
        'https://admin.demo.threekit.com/pricebook/' + userId,
        requestOptions
      )
        .then(response => response.json())
        .then(result => {
          let ApiPricebook = result.pricebooks.filter(book => {
            return book.name.toLowerCase() === 'website'
          })
          if (window.configurator) {
            if (ApiPricebook) {
              setPricebook(ApiPricebook)
              ApiPricebook = ApiPricebook[0]

              let currentPrice = window.configurator.getPrice(
                ApiPricebook.id,
                ApiPricebook.currencies[0]
              )
              console.log(ApiPricebook)
              if (currentPrice !== price) {
                setPrice(currentPrice)
              }
            }
          }
        })
        .catch(error => console.log('error', error))
    } else {
      if (window.configurator) {
        console.log(pricebook)
        let currentPrice = window.configurator.getPrice(
          pricebook[0].id,
          pricebook[0].currencies[0]
        )
        if (currentPrice !== price) {
          setPrice(currentPrice)
          console.log('currentprice', currentPrice)
        }
      }
    }
  }, [price, props])

  return (
    <div key={props.key}>
      {price > 0 ? (
        <Box style={props.styles}>
          <Paper
            elevation={6}
            style={{
              borderRadius: '10px',
              border: '1px solid #79AC85'
            }}
          >
            <h2
              style={{
                margin: '2px',
                color: '#0F2526'
              }}
            >
              Price: ${price}
            </h2>
          </Paper>
        </Box>
      ) : null}{' '}
    </div>
  )
}
