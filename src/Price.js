/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { MenuItem, Select, Typography } from '@material-ui/core'
import getSymbolFromCurrency from 'currency-symbol-map'
import Portal from './Portal'
import CurrencyPortal from './CurrencyPortal'

export default function Price(props) {
  const [price, setPrice] = useState(0)
  const [currencies, setCurrencies] = useState(0)
  const [activeCurrency, setCurrency] = useState(0)
  const [pricebook, setPricebook] = useState(null)
  const [selectVal, setSelectVal] = useState(currencies[0]);


  useEffect(() => {
    getPrice()
  }, [price, props])

  function renderValue() {
    return activeCurrency
  }

  function getPrice() {

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
          console.log(result)
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
                props.setPriceLoaded(true)
              }
            } else {
              props.setPriceLoaded(true)
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
          props.setPriceLoaded(true)
        }
      } else {
        props.setPriceLoaded(true)
      }
    }
  }
  useEffect(() => {
    getPrice()
  }, [activeCurrency]);

  return (
    <div key={props.key}>
      <Portal>
        {price > 0 ? (
          <Box>
            <Typography
              variant={'h5'}
              style={{
                textAlign: 'center',
                fontWeight: 600

              }}

            >
              {getSymbolFromCurrency(activeCurrency) ? getSymbolFromCurrency(activeCurrency) : 'errorororor'}{price}
            </Typography>
          </Box>
        ) : null}
      </Portal>
      {currencies ?
        <CurrencyPortal>
          <div style={{
            position: 'absolute',
            bottom: '3px',
            right: "3px"
          }}>
            <Typography variant="caption">currency</Typography>

            <Select
              labelId="demo-simple-select-label"
              id="currency-select"
              value={activeCurrency}
              key={currencies}
              renderValue={renderValue}
              onChange={(e) => {
                setCurrency(e.target.value)
                setSelectVal(e.target.value)
              }}
            >{currencies.map(currency => {
              return (
                <MenuItem
                  key={currency}
                  value={currency}
                  className='currency'
                >{currency}</MenuItem>
              )
            })}
            </Select>
          </div>
        </CurrencyPortal>
        : null}
    </div>
  )
}
