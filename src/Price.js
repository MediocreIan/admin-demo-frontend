import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { MenuItem, Select } from '@material-ui/core'
import getSymbolFromCurrency from 'currency-symbol-map'

export default function Price(props) {
  const [price, setPrice] = useState(0)
  const [currencies, setCurrencies] = useState(0)
  const [activeCurrency, setCurrency] = useState(0)
  const [attributes, setAttributes] = useState(props.attributes)
  const [pricebook, setPricebook] = useState(null)
  const [selectVal, setSelectVal] = useState(currencies[0]);


  useEffect(() => {
    getPrice()
  }, [price, props])

  function getPrice(currency) {

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
              setCurrencies(ApiPricebook.currencies)
              if (!activeCurrency) {
                setCurrency(ApiPricebook.currencies[0])
              }
              let currentPrice = window.configurator.getPrice(
                ApiPricebook.id,
                activeCurrency
              )
              if (currentPrice !== price) {
                setPrice(currentPrice)
              }
            }
          }
        })
        .catch(error => console.log('error', error))
    } else {
      if (window.configurator && pricebook.length > 0) {
        let currentPrice = window.configurator.getPrice(
          pricebook[0].id,
          activeCurrency
        )
        if (currentPrice !== price) {
          setPrice(currentPrice)
        }
      }
    }
  }
  useEffect(() => {
    getPrice()
  }, [activeCurrency]);

  return (
    <div key={props.key}>
      {price > 0 ? (
        <Box>
          <Paper
            elevation={1}
            style={props.styles}
          >
            <h2
              style={{
                margin: '2px',
                color: '#0F2526'
              }}
            >
              Price: {getSymbolFromCurrency(activeCurrency) ? getSymbolFromCurrency(activeCurrency) : 'errorororor'}{price}
            </h2>
          </Paper>
        </Box>
      ) : null}
      {currencies ? <Select
        labelId="demo-simple-select-label"
        id="currency-select"
        value={selectVal}
        key={currencies}
        style={{
          position: 'absolute',
          bottom: '5px',
          right: "5px"
        }}
        onChange={(e) => {
          setCurrency(e.target.value)
          setSelectVal(e.target.value)
        }}
      >{currencies.map(currency => {
        return (
          <MenuItem
            value={currency}
            className='currency'
          >{currency}</MenuItem>
        )
      })}
      </Select>

        : null}
    </div>
  )
}
