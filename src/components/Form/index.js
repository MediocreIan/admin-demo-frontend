/* eslint-disable default-case */
import React, { useState, useEffect } from 'react'
import NestedForm from './NestedForm'
import './style.css'
// UI Elements
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TuneIcon from '@material-ui/icons/Tune'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Paper from '@material-ui/core/Paper'
import StringComponent from './String'
import NumberInput from './NumberInput'

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
  },
  formBtn: {
    // margin: 5
  }
}))

export default function Landing (props) {
  // Style
  const classes = useStyles()
  const matches = useMediaQuery('(min-width:600px)')

  // Gets the current step
  const [current, setCurrent] = useState(1)
  const [currentAttr, setCurrentAttr] = useState()
  const [currentAttrIndex, setCurrentAttrIndex] = useState(0)
  const [screen, setScreen] = useState(props.screen)

  // Saving the length of the array in state, probably not needed.
  const [attributes, setAttributes] = useState(
    window.configurator.getDisplayAttributes()
  )
  const [length, setLength] = useState(attributes.length)

  // Configs
  const [selectSelect, setSelectSelect] = useState('')
  const [color, setColor] = useState('#000')
  const [file, setFile] = useState()
  const [num, setNum] = useState(0)
  const [text, setText] = useState('')
  const [isNested, setIsNested] = useState(false)
  const [nestedAttr, setNestedAttr] = useState([])
  const [showForm, setShowForm] = useState(true)
  // const [playerHeight, setPlayerHeight] =useState()

  function checkNested (attr, active) {
    window.pl = window.player.enableApi('player')
    window.config = window.pl.configurator
    // console.log("########", attr)
    if (!window.config) {
      return
    }

    if (
      window.config.getNestedConfigurator(attr) &&
      active === attr.value.assetId
    ) {
      // console.log('nested getDisplayAttributes')
      // console.log(
      //   window.config.getNestedConfigurator(attr).getDisplayAttributes()
      // )
      return window.config.getNestedConfigurator(attr).getDisplayAttributes()
    } else {
      return false
    }
    // console.log(window.config.getNestedConfigurator(attr))
  }

  useEffect(() => {
    // setCurrentAttr(attributes[currentAttrIndex].name)
    // enable private API for nested config
    // attributes.forEach((element, index) => {
    //   console.log()
    //   if (checkNested(element)) {
    //     setNestedAttr(nestedAttr => [...nestedAttr, index])
    //   }
    //   console.log(nestedAttr)
    // })
  }, [attributes, current, currentAttr, currentAttrIndex, isNested, nestedAttr])

  // Check to make sure we can't go too far in the steps
  function setStep (dir, attr) {
    setSelectSelect()
    setNum()

    if (dir == 'forward') {
      if (current == length) {
        return
      } else {
        setCurrent(current => current + 1)
        setCurrentAttrIndex(currentAttrIndex => currentAttrIndex + 1)
      }
    } else {
      if (current == 1) {
        return
      } else {
        setCurrent(current => current - 1)
        setCurrentAttrIndex(currentAttrIndex => currentAttrIndex - 1)
      }
    }
  }

  function handleSelect (attr, e) {
    // setSelectSelect(e.target.value)
    window.configurator.setConfiguration({ [attr]: e.target.value })
    setAttributes(window.configurator.getDisplayAttributes())
  }
  function handleColor (event, e) {
    setColor(e)
    let color = e.rgb
    window.configurator.setConfiguration({
      [event]: { r: color[0] / 255, g: color[1] / 255, b: color[2] / 255 }
    })
    setAttributes(window.configurator.getDisplayAttributes())
  }
  function handleUpload (e) {
    setFile(e)
    window.configurator.setConfiguration(e)
    setAttributes(window.configurator.getDisplayAttributes())
  }
  function handleString (attr, val) {
    // This will be set config obj
    window.configurator.setConfiguration({ [attr]: val })
    setAttributes(window.configurator.getDisplayAttributes())
    console.log(attributes)
  }
  function handlePartRef (attr, val) {
    // This will be set config obj
    window.configurator
      .setConfiguration({ [attr]: { assetId: val } })
      .then(() => {
        setAttributes(window.configurator.getDisplayAttributes())
        setLength(window.configurator.getDisplayAttributes().length)
      })
  }
  function handleSlide (attr, e, newValue) {
    // This will be set config obj
    window.configurator.setConfiguration({ [attr]: newValue })
    setNum(newValue)
    setAttributes(window.configurator.getDisplayAttributes())
  }

  function handleTextInput (attr, value) {
    setText(value)
    window.configurator.setConfiguration({ [attr]: value })
    setAttributes(window.configurator.getDisplayAttributes())
  }

  function toggleShowForm () {
    setShowForm(!showForm)
  }
  return (
    <div>
      {attributes.length === 1 ? (
        <h4>{attributes[currentAttrIndex].name}</h4>
      ) : (
        <div style={{ margin: '10px' }}>
          <center>
            <ArrowBackIcon
              onClick={() => setStep('back')}
              style={{ display: 'inline' }}
            />
            <Button onClick={() => toggleShowForm()}>
              <h3 style={{ display: 'inline' }}>
                {attributes[currentAttrIndex].name}
              </h3>
            </Button>

            <ArrowForwardIcon
              onClick={() => setStep('forward')}
              style={{ display: 'inline' }}
            />
          </center>
          {/* <ArrowBackIcon onClick={() => setStep('back')} style={{float: 'left'}} />
          <h4 style={{float: 'left'}}>{attributes[currentAttrIndex].name}</h4>

          <ArrowForwardIcon onClick={() => setStep('forward')} style={{float: 'left'}} /> */}
        </div>
      )}

      {showForm ? (
        <Grid
          container
          spacing={0}
          justify='space-around'
          justifyContent='center'
          justifyItems='center'
          style={{
            flexGrow: '1',
            margin: '0 auto 0',
            alignItems: 'stretch',
            maxWidth: '1000px'
          }}
        >
          {[attributes[current - 1]].map((event, i) => {
            // console.log('attr index ' + currentAttrIndex)
            switch (event.type) {
              case 'String':
                return(
                  <StringComponent
                    e={event}
                    handleString={handleString}
                    handleTextInput={handleTextInput}
                    selectSelect={selectSelect}
                    text={text}
                  />
                )

                break
              case 'Number':
                return (
                  <NumberInput
                    event={event}
                    handleSlide={handleSlide}
                    num={num}
                  />
                )

                break
              case 'Color':
                return (
                  <div>
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
                      {/* <p>Part-Ref Long {event.name}</p> */}
                      <FormControl className={classes.formControl}>
                        <InputLabel id={event.id}>{event.name}</InputLabel>
                        <Select id={event.id} value={selectSelect}>
                          {event.values.map(f => {
                            console.log(f)
                            return (
                              <div>
                                {checkNested(
                                  attributes[currentAttrIndex],
                                  f.assetId
                                ) ? (
                                  <NestedForm
                                    data={checkNested(
                                      attributes[currentAttrIndex],
                                      f.assetId
                                    )}
                                    configurator={window.config.getNestedConfigurator(
                                      attributes[currentAttrIndex]
                                    )}
                                  />
                                ) : (
                                  <p>no nest</p>
                                )}

                                <MenuItem
                                  value={f.assetId}
                                  onClick={() =>
                                    handlePartRef(event.name, f.assetId, event)
                                  }
                                >
                                  {f.label}
                                </MenuItem>
                              </div>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  )
                } else if (event.values.length < 10) {
                  return event.values.map((f, i) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        align='center'
                        style={
                          {
                            // height: "100%"
                          }
                        }
                      >
                        {' '}
                        {checkNested(
                          attributes[currentAttrIndex],
                          f.assetId
                        ) ? (
                          <NestedForm
                            data={checkNested(
                              attributes[currentAttrIndex],
                              f.assetId
                            )}
                            configurator={window.config.getNestedConfigurator(
                              attributes[currentAttrIndex]
                            )}
                          />
                        ) : null}
                        <Button
                          startIcon={
                            checkNested(
                              attributes[currentAttrIndex],
                              f.assetId
                            ) ? (
                              <TuneIcon />
                            ) : null
                          }
                          onClick={() =>
                            handlePartRef(event.name, f.assetId, event)
                          }
                          className={classes.formBtn}
                          style={{
                            width: '70%',
                            minHeight: '100%',
                            color: '#044849'
                          }}
                        >
                          <Paper
                            elevation={1}
                            style={{
                              textAlign: 'center',
                              width: '100%',
                              minHeight: '100%',
                              color: '#044849'
                            }}
                          >
                            {f.label}
                          </Paper>
                        </Button>
                      </Grid>
                    )
                  })
                }
                break
            }
          })}
        </Grid>
      ) : null}
    </div>
  )
}
