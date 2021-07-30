import React, { useState, useEffect } from 'react'
import ProductListCard from './ProductListCard'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

export default function Listing(props) {
  let history = useHistory()

  const [products, setProducts] = useState([])
  const [user, setUser] = useState({})

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
      <h1>Product list</h1>
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
          {window.location.pathname.split('/')[2].replaceAll("%20", " ").trim()}
        </Typography>
      </Breadcrumbs>
      {products ? (
        products.map(product => {
          return (
            <ProductListCard product={product} userId={id} key={product.id} />
          )
        })
      ) : (
        <h4>
          No products found, you may need to add the "website" tag to your
          products
        </h4>
      )}
    </>
  )
}
