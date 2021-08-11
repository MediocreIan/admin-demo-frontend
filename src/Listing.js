/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import ProductListCard from './ProductListCard'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

export default function Listing(props) {
  let history = useHistory()

  const [products, setProducts] = useState([])

  // eslint-disable-next-line no-unused-vars
  let { id, name, publicToken } = useParams()
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(`https://admin.demo.threekit.com/products/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setProducts(result.assets)
      })
      .catch(error => console.log('error', error))
  }, [props.match.params.id])

  return (
    <>
      <Typography variant="h4">Products</Typography>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link
          color='inherit'
          onClick={() => {
            history.push(`/`)
          }}
        >
          Home
        </Link>
        <Typography color='textPrimary'>
          {window.location.pathname
            .split('/')[2]
            .replaceAll('%20', ' ')
            .trim()}
        </Typography>
      </Breadcrumbs>
      <Grid container justifyContent='center' spacing={3}>
        {products ? (
          products.map(product => {
            return (
              <Grid item
                key={product.id}

              >
                <ProductListCard
                  product={product}
                  userId={id}
                  key={product.id}
                />
              </Grid>
            )
          })
        ) : (
          <h4>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            No products found, you may need to add the "website" tag to your
            products
          </h4>
        )}
      </Grid>
    </>
  )
}
