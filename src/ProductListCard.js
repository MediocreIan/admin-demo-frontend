import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'

import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    maxWidth: 345,
    margin: '0 auto 10px',

  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  },
  media: {
    height: 300
  }
}))

export default function MediaControlCard (props) {
  const [thumb, setThumb] = useState(null)

  useEffect(() => {
    console.log(
      `https://preview.threekit.com/api/assets/thumbnail/${props.product.id}?orgId=${props.product.orgId}&failOnEmpty=true`
    )
    setThumb(
      `https://preview.threekit.com/api/assets/thumbnail/${props.product.id}?orgId=${props.product.orgId}&failOnEmpty=true`
    )
    return () => {
      setThumb(null)
    }
  }, [thumb])
  const classes = useStyles()
  const theme = useTheme()
  let history = useHistory()

  return (
    <Card
      className={classes.root}
      onClick={() => {
        history.push(`/details/${props.userId}/${props.product.id}`)
      }}
      
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={thumb}
          title={props.product.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.product.name}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className={classes.details}>
        {/* <CardContent className={classes.content}>
          <Typography component='h5' variant='h5'>
            {props.product.name}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {props.product.description}
          </Typography>
          <Typography
            variant='subtitle1'
            color='textSecondary'
            onClick={() => {
              history.push(`/details/${props.userId}/${props.product.id}`)
            }}
          >
            details
          </Typography>
        </CardContent> */}
      </div>
      {/* <CardMedia
        className={classes.cover}
        image={thumb}
        title='Live from space album cover'
      /> */}
    </Card>
  )
}
