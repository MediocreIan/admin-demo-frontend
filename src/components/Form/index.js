/* eslint-disable react/prop-types */
/* eslint-disable default-case */
import React, { useState, useEffect } from 'react'
import NestedForm from './NestedForm'
import './style.css'
// UI Elements
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { FormControlLabel, Switch } from '@material-ui/core'

import StringComponent from './String'
import NumberInput from './NumberInput'
import Price from '../../Price'
import Locale from '../../Locale'

// import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

// Type = Number for numerical input
import { ColorPicker } from 'material-ui-color'
import Skeleton from '@material-ui/lab/Skeleton'

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

export default function Landing(props) {
  // Style
  const classes = useStyles()

  // Gets the current step
  const [current, setCurrent] = useState(1)
  const [currentAttr] = useState()
  const [currentAttrIndex, setCurrentAttrIndex] = useState(0)
  const [translatedAttributes, setTranslatedAttributes] = useState();

  // Saving the length of the array in state, probably not needed.
  const [attributes, setAttributes] = useState(
    window.configurator.getDisplayAttributes()
  )
  const [length, setLength] = useState(attributes.length)
  const [key] = useState()

  // Configs
  const [selectSelect, setSelectSelect] = useState('')
  const [partRefSelect, setPartRefSelect] = useState('')
  const [color, setColor] = useState('#000')
  const [num, setNum] = useState(0)
  const [text, setText] = useState('')
  const [isNested] = useState(false)
  const [nestedAttr] = useState([])
  const [showForm, setShowForm] = useState(true)
  const [checked, setChecked] = useState(false);
  // const [playerHeight, setPlayerHeight] =useState()

  function checkNested(attr, active) {
    window.pl = window.player.enableApi('player')
    window.config = window.pl.configurator
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
    translate()

    // setCurrentAttr(attributes[currentAttrIndex].name)
    // enable private API for nested config
    // attributes.forEach((element, index) => {
    //   console.log()
    //   if (checkNested(element)) {
    //     setNestedAttr(nestedAttr => [...nestedAttr, index])
    //   }
    //   console.log(nestedAttr)
    // })
  }, [
    attributes,
    current,
    currentAttr,
    currentAttrIndex,
    isNested,
    nestedAttr,
    props,
    key
  ])

  // Check to make sure we can't go too far in the steps
  function setStep(dir) {
    setPartRefSelect(null)
    setSelectSelect()
    setNum()

    if (dir == 'forward') {
      if (current == length) {
        setCurrent(() => 1)
        setCurrentAttrIndex(0)

      } else {
        setCurrent(current => current + 1)
        setCurrentAttrIndex(currentAttrIndex => currentAttrIndex + 1)
      }
    } else {
      if (current == 1) {
        setCurrent(length)
        setCurrentAttrIndex(length - 1)
      } else {
        setCurrent(current => current - 1)
        setCurrentAttrIndex(currentAttrIndex => currentAttrIndex - 1)
      }
    }
  }

  // function handleSelect(attr, e) {
  //   // setSelectSelect(e.target.value)
  //   window.configurator.setConfiguration({ [attr]: e.target.value })
  //   setAttributes(window.configurator.getDisplayAttributes())
  // }
  function handleColor(event, e) {
    setColor(e)
    let color = e.rgb
    window.configurator.setConfiguration({
      [event]: { r: color[0] / 255, g: color[1] / 255, b: color[2] / 255 }
    }).then(() => {
      setAttributes(window.configurator.getDisplayAttributes())
      translate()
      setLength(window.configurator.getDisplayAttributes().length)

    })
  }
  // function handleUpload(e) {
  //   setFile(e)
  //   window.configurator.setConfiguration(e)
  //   setAttributes(window.configurator.getDisplayAttributes())
  translate()
  // }
  function handleString(attr, val) {
    // This will be set config obj
    window.configurator.setConfiguration({ [attr]: val }).then(() => {
      setAttributes(window.configurator.getDisplayAttributes())
      translate()
      setLength(window.configurator.getDisplayAttributes().length)
    })
  }
  function handlePartRef(attr, val) {
    // This will be set config obj

    window.configurator
      .setConfiguration({ [attr]: { assetId: val } })
      .then(() => {
        setAttributes(window.configurator.getDisplayAttributes())
        translate()
        setLength(window.configurator.getDisplayAttributes().length)
        // console.log(val)
      })
  }
  function handleSlide(attr, e, newValue) {
    // This will be set config obj
    window.configurator.setConfiguration({ [attr]: newValue }).then(() => {
      setAttributes(window.configurator.getDisplayAttributes())
      translate()
      setLength(window.configurator.getDisplayAttributes().length)
    })
    setNum(newValue)

  }

  function handleTextInput(attr, value) {
    setText(value)
    window.configurator.setConfiguration({ [attr]: value }).then(() => {
      setAttributes(window.configurator.getDisplayAttributes())
      translate()
      setLength(window.configurator.getDisplayAttributes().length)
    })

  }

  function handleToggle(event, e) {
    setChecked(!checked)
    console.log(e.target.value)
    window.configurator.setConfiguration({ [event.name]: !checked }).then(() => {
      setAttributes(window.configurator.getDisplayAttributes())
      translate()
      setLength(window.configurator.getDisplayAttributes().length)
    })

  }

  function toggleShowForm() {
    setShowForm(!showForm)
  }

  function translate() {
    if (window.player.getTranslations() && Object.keys(window.player.getTranslations()).length > 0 && window.configurator.getDisplayAttributes()) {
      let newAttributes = window.configurator
        .getDisplayAttributes()
        .map(attribute => {
          Object.keys(window.player.getTranslations()).forEach(translationKey => {
            if (attribute.name === translationKey) {
              attribute.label = window.player.getTranslations()[translationKey]
            }
            attribute.values.forEach((value) => {
              if (value.label === translationKey) {
                value.label = window.player.getTranslations()[translationKey]
              }
            })
          })
          return attribute
        })

      if (attributes[0].label !== newAttributes[0].label) {
        console.log(newAttributes, attributes)
        setAttributes(newAttributes)
        //this is dirty. the purpose of value attribtues is to change the name of the values without changing the name of the attribtue itself. 
        //the purpose of the translated attributes is to change the name of the attribtues and use that as the display name for the attribute
        // this is necessary because the name of the attribute is also what setDisplayAttributes() uses to set. 
        //We should make another key on attributes in the future and use that for the display to fix this problem
      }
    }
  }

  function generatePartRefOptions(event) {
    event.values.sort((a, b) => {
      if (a.label < b.label) { return -1 }
      if (a.label > b.label) { return 1 }
      return 0
    })
    return event.values.map(f => {
      return (

        <MenuItem
          value={{ id: f.assetId, label: f.label }}
          // primaryText={f.label}
          key={f.id}
        >
          {f.label}
        </MenuItem>

      )
    })
  }

  function renderValue(value) {
    console.log(value)
    return value;
  }

  return (
    <div>
      {attributes.length === 1 ? (
        <center>
          <h4>{attributes[currentAttrIndex].name}</h4>
        </center>
      ) : (
        <div style={{ margin: '10px' }}>
          <Grid
            container
            justifyItems="center"
            alignItems="center"
            justify="center"
            align="center"
          >
            <Button>
              <ArrowBackIcon
                onClick={() => setStep('back')}
                style={{ display: 'inline' }}
              />
            </Button>
            <Button style={{
              width: "220px"
            }}
              id="no-hover"
            >
              <h3 style={{ display: 'inline' }}>
                {attributes[currentAttrIndex].label}
              </h3>
            </Button>
            < Button>
              <ArrowForwardIcon
                onClick={() => setStep('forward')}
                style={{ display: 'inline' }}
              />
            </Button>
          </Grid>
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
          {[attributes[currentAttrIndex]].map((event) => {
            // console.log('attr index ' + currentAttrIndex)
            switch (event.type) {
              case 'String':
                return (
                  <StringComponent
                    e={event}
                    handleString={handleString}
                    handleTextInput={handleTextInput}
                    selectSelect={selectSelect}
                    text={text}
                  />
                )

                // eslint-disable-next-line no-unreachable
                break
              case 'Boolean':
                return (
                  <Switch
                    checked={checked}
                    value={checked}
                    onChange={(e) => handleToggle(event, e)}
                    color="#E48B6E"
                    name="checkedB"
                  />
                )

                // eslint-disable-next-line no-unreachable
                break
              case 'Number':
                return (
                  <NumberInput
                    event={event}
                    handleSlide={handleSlide}
                    num={num}
                  />
                )

                // eslint-disable-next-line no-unreachable
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
                // eslint-disable-next-line no-unreachable
                break
              case 'Asset':
                if (event.assetType == 'upload') {
                  return (
                    // need to build this
                    <p>Image upload is not yet supported on this app. </p>
                  )
                } else if (event.values.length > 0) {
                  return (
                    <div>
                      {/* <p>Part-Ref Long {event.name}</p> */}
                      <FormControl className={classes.formControl}>
                        <InputLabel id={event.id}>{attributes[currentAttrIndex].label}</InputLabel>
                        <br />
                        <div>
                          {event.values.map(g => {
                            return checkNested(
                              attributes[currentAttrIndex],
                              g.assetId
                            ) ? (
                              <NestedForm
                                style={{ display: 'inline' }}
                                data={checkNested(
                                  attributes[currentAttrIndex],
                                  g.assetId
                                )}
                                configurator={window.config.getNestedConfigurator(
                                  attributes[currentAttrIndex]
                                )}
                              />
                            ) : null
                          })}
                        </div>

                        <Select
                          id={event.id}
                          value={partRefSelect}
                          style={{ minWidth: 250 }}
                          renderValue={() => renderValue(partRefSelect)}
                          onChange={(e) => {
                            console.log(e.target.value)
                            handlePartRef(event.name, e.target.value.id)
                            setPartRefSelect(e.target.value.label)
                          }}
                        >
                          {generatePartRefOptions(event)}
                        </Select>
                      </FormControl>
                    </div>
                  )
                } else if (event.values.length < 10) {
                  return event.values.map((f) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={f.assetId}
                        align='center'
                        style={
                          {
                            // height: "100%"
                          }
                        }
                      >
                        {' '}
                        {/* {checkNested(
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
                        ) : null} */}
                        <Button
                          startIcon={
                            checkNested(
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
                        >{f.label}
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
      {props.playerLoaded ? (
        <Price
          setPriceLoaded={props.setPriceLoaded}
          userId={props.userId}
          key={attributes}
          loaded={props.playerLoaded}
          styles={{
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'sticky',
            bottom: '0px',
            padding: '10px'
          }}
        />
      ) : null}
      <Locale
        attributes={attributes}
        setAttributes={setAttributes}
        userId={props.userId}
        translate={translate}
        playerLoaded={props.playerLoaded}
      />
    </div>
  )
}