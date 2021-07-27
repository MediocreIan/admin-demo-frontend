import React, { useState } from 'react'

// UI Elements
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
// import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

// Type = Number for numerical input
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'
import { ColorPicker } from 'material-ui-color'
import { DropzoneArea } from 'material-ui-dropzone'

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
  }
}))

export default function Landing (props) {
  // Style
  const classes = useStyles()
  const matches = useMediaQuery('(min-width:600px)')

  // Gets the current step
  const [current, setCurrent] = useState(1)
  // Saving the length of the array in state, probably not needed.
  const [length, setLength] = useState(props.data.length)

  // Configs
  const [selectSelect, setSelectSelect] = useState('')
  const [color, setColor] = useState('#000')
  const [file, setFile] = useState()
  const [num, setNum] = useState(0)
  const [text, setText] = useState('')

  // Check to make sure we can't go too far in the steps
  function setStep (dir, attr) {
    setSelectSelect()
    setNum()

    if (dir == 'forward') {
      if (current == length) {
        return
      } else {
        setCurrent(current => current + 1)
      }
    } else {
      if (current == 1) {
        return
      } else {
        setCurrent(current => current - 1)
      }
    }
  }

  function handleSelect (attr, e) {
    // setSelectSelect(e.target.value)
    console.log({ [attr]: e.target.value })
  }
  function handleColor (event, e) {
    setColor(e)
    let color = e.rgb
    console.log({
      [event]: { r: color[0] / 255, g: color[1] / 255, b: color[2] / 255 }
    })
  }
  function handleUpload (e) {
    setFile(e)
    console.log(e)
  }
  function handleString (attr, val) {
    // This will be set config obj
    console.log({ [attr]: val })
  }
  function handlePartRef (attr, val) {
    // This will be set config obj
    console.log({ [attr]: { assetId: val } })
  }
  function handleSlide (attr, e, newValue) {
    // This will be set config obj
    console.log({ [attr]: newValue })
    setNum(newValue)
  }

  function handleTextInput (attr, value) {
    setText(value)
    console.log({ [attr]: value })
  }
  return (
    <div>
      <h4>Current Step: {current}</h4>
      <ArrowBackIcon onClick={() => setStep('back')} />
      <ArrowForwardIcon onClick={() => setStep('forward')} />
      <div
        className='form-container'
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
      >
        {[props.data[current - 1]].map(event => {
          switch (event.type) {
            case 'String':
              if (event.values.length > 10) {
                return (
                  <div>
                    <p>Long String {event.name}</p>
                    <FormControl className={classes.formControl}>
                      <InputLabel id={event.id}>{event.name}</InputLabel>
                      <Select id={event.id} value={selectSelect}>
                        {event.values.map(f => {
                          return (
                            <MenuItem
                              value={f.value}
                              onClick={() => handleString(event.name, f.value)}
                            >
                              {f.label}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </div>
                )
              } else if (event.values.length == 0) {
                return <TextField value={text} onChange={(e) => handleTextInput(event.name, e.target.value)} placeholder={'Personalize your item'}/>
              } else {
                return (
                  <div>
                    <p>String {event.name}</p>
                    <ButtonGroup
                      color='primary'
                      orientation={`${matches ? `horizontal` : `vertical`}`}
                    >
                      {event.values.map(f => {
                        return (
                          <Button
                            onClick={() =>
                              handleString(event.name, f.value, event)
                            }
                          >
                            {f.label}
                          </Button>
                        )
                      })}
                    </ButtonGroup>
                  </div>
                )
              }
              break
            case 'Number':
              return (
                <div className={classes.root}>
                  <Typography id={event.id} gutterBottom>
                    {event.name}
                  </Typography>
                  <Slider
                    defaultValue={event.defaultValue}
                    value={num}
                    // getAriaValueText={valuetext}
                    aria-labelledby={event.id}
                    valueLabelDisplay='auto'
                    step={event.step}
                    marks
                    onChange={(e, newValue) =>
                      handleSlide(event.name, e, newValue)
                    }
                    min={event.min}
                    max={event.max}
                  />
                </div>

                // <li>
                //   Number {e.name} - min: {e.min} max: {e.max}
                // </li>
              )
              break
            case 'Color':
              return (
                <div>
                  <p>{event.name}</p>
                  <ColorPicker
                    defaultValue={color}
                    value={color}
                    data-name={'hello'}
                    onChange={e => handleColor(event.name, e)}
                  />
                </div>
              )
              break
            case 'Asset':
              if (event.assetType == 'upload') {
                return <DropzoneArea filesLimit={1} onChange={handleUpload} />
              } else if (event.values.length > 10) {
                return (
                  <div>
                    <p>Part-Ref Long {event.name}</p>
                    <FormControl className={classes.formControl}>
                      <InputLabel id={event.id}>{event.name}</InputLabel>
                      <Select id={event.id} value={selectSelect}>
                        {event.values.map(f => {
                          return (
                            <MenuItem
                              value={f.assetId}
                              onClick={() =>
                                handlePartRef(event.name, f.assetId, event)
                              }
                            >
                              {f.label}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </div>
                )
              } else {
                return (
                  <div>
                    <p>Part Ref {event.name}</p>
                    <ButtonGroup
                      color='primary'
                      orientation={`${matches ? `horizontal` : `vertical`}`}
                    >
                      {event.values.map(f => {
                        return (
                          <Button
                            onClick={() =>
                              handlePartRef(event.name, f.assetId, event)
                            }
                          >
                            {f.label}
                          </Button>
                        )
                      })}
                    </ButtonGroup>
                  </div>
                )
              }
              break
          }
        })}
      </div>
    </div>
  )
}
