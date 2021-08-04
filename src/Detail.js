import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import data from './components/Form/data'
import { useParams } from 'react-router-dom'
import Price from './Price'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

export default function Landing (props) {
  const [product, setProduct] = useState({})
  const [attributes, setAttributes] = useState(null)
  const [playerLoaded, setPlayerLoaded] = useState(false)
  const [err, setErr] = useState(null)
  const [user, setUser] = useState(null)
  let { userId, productId } = useParams()
  let history = useHistory()

  useEffect(() => {
    // get user
    fetch(
      `https://admin.demo.threekit.com/all`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        result.forEach(e => {
          if(e._id == window.location.pathname.split('/')[2]){
            setUser (e.name)
          }
        })
       
      })
      .catch(error => console.log('error', error))
    // end get user
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
          console.log('product',result)
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
          setPlayerLoaded(true)
          if (attributes === null) {
            setAttributes(window.configurator.getDisplayAttributes())
            const privateConfig = window.player
              .enableApi('player')
              .getConfigurator()
            privateConfig.on('setConfiguration', config => {
              setAttributes(window.configurator.getDisplayAttributes())
            })
          }
        })
        .catch(err => {
          setErr(err)
        })
    }
    return () => {
      if (window.player) {
        window.player.unload()
      }
    }
  }, [product, attributes, props.match.params.userId])
  return (
    <>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link
          color='inherit'
          onClick={() => {
            history.push(`/`)
          }}
        >
          Home
        </Link>
        <Link
          color='inherit'
          onClick={() => {
            history.goBack()
          }}
        >
          {user}
        </Link>
        <Typography color='textPrimary'>
          {product.name}
        </Typography>
      </Breadcrumbs>
      {!err ? (
        <div
          id='player'
          style={{
            height: '50vh',
            margin: '5px auto 5px',
            width: '80vw'
          }}
        ></div>
      ) : (
        <h4>
          There was an error loading this asset. Please ensure the token,
          assetId, and orgID are all correct.
        </h4>
      )}

      {attributes === null || attributes.length === 0 ? null : (
        <Form
          data={attributes}
          setAttributes={setAttributes}
          screen={'parent'}
          userId={userId}
          key={playerLoaded}
          playerLoaded={playerLoaded}
        />
      )}
    </>
  )
}
