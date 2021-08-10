/* eslint-disable react/prop-types */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    width: 300
  },
  formBtn: {
    // margin: 5
  }
}))

export default function NumberInput(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography id={props.event.id} gutterBottom>
        {props.event.name}
      </Typography>
      <Slider
        defaultValue={props.event.defaultValue}
        value={props.num}
        // getAriaValueText={valuetext}
        aria-labelledby={props.event.id}
        valueLabelDisplay='auto'
        step={props.event.step}
        marks={[{ value: props.event.min, label: props.event.min }, { value: props.event.max, label: props.event.max }]}
        onChange={(e, newValue) =>
          props.handleSlide(props.event.name, e, newValue)
        }
        min={props.event.min}
        max={props.event.max}
      />
    </div>

    // <li>
    //   Number {e.name} - min: {e.min} max: {e.max}
    // </li>
  )
}
