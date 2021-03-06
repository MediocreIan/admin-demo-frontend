/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
/* eslint-disable default-case */
import React, { useState, useEffect } from 'react'
import NestedForm from './NestedForm'
import "./style.css"
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
import TuneIcon from '@material-ui/icons/Tune'

// import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/NativeSelect'

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
        margin: 5
    }
}))

export default function Landing(props) {
    // Style
    const classes = useStyles()
    const matches = useMediaQuery('(min-width:600px)')

    // Gets the current step
    const [current, setCurrent] = useState(1)
    const [currentAttr] = useState()
    const [currentAttrIndex, setCurrentAttrIndex] = useState(0)

    // Saving the length of the array in state, probably not needed.
    const [attributes] = useState(window.configurator.getDisplayAttributes())
    const [length, setLength] = useState(props.data.length.length)


    // Configs
    const [selectSelect, setSelectSelect] = useState('')
    const [color, setColor] = useState('#000')
    const [num, setNum] = useState(0)
    const [text, setText] = useState('')
    const [isNested] = useState(false)
    const [nestedAttr] = useState([])

    function checkNested(attr) {
        window.pl = window.player.enableApi('player')
        window.config = window.pl.configurator
        // console.log("########", attr)
        if (!window.config) {
            return
        }

        if (window.config.getNestedConfigurator(attr)) {
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
    function setStep(dir) {
        setSelectSelect()
        setNum()

        if (dir === 'forward') {
            if (current === length) {
                return
            } else {
                setCurrent(current => current + 1)
                setCurrentAttrIndex(currentAttrIndex => currentAttrIndex + 1)
            }
        } else {
            if (current === 1) {
                return
            } else {
                setCurrent(current => current - 1)
                setCurrentAttrIndex(currentAttrIndex => currentAttrIndex - 1)
            }
        }
    }

    function handleColor(event, e) {
        setColor(e)
        let color = e.rgb
        props.configurator.setConfiguration({
            [event]: { r: color[0] / 255, g: color[1] / 255, b: color[2] / 255 }
        })

    }
    // function handleUpload(e) {
    //     setFile(e)
    //     props.configurator.setConfiguration(e)

    // }
    function handleString(attr, val) {
        // This will be set config obj
        props.configurator.setConfiguration({ [attr]: val })

    }
    function handlePartRef(attr, val) {
        // This will be set config obj
        props.configurator.setConfiguration({ [attr]: { assetId: val } }).then(() => {
            setLength(window.configurator.getDisplayAttributes().length)
        })
    }
    function handleSlide(attr, e, newValue) {
        // This will be set config obj
        props.configurator.setConfiguration({ [attr]: newValue })
        setNum(newValue)
    }

    function handleTextInput(attr, value) {
        setText(value)
        props.configurator.setConfiguration({ [attr]: value })
    }
    return (
        <div>
            {props.data.length === 1 ? (
                <h4>{props.data[currentAttrIndex].name}</h4>
            ) : (
                <div style={{ margin: '10px' }}>
                    <center>
                        <ArrowBackIcon
                            onClick={() => setStep('back')}
                            style={{ display: 'inline' }}
                        />
                        <h3 style={{ display: 'inline' }}>
                            {props.data[currentAttrIndex].name}
                        </h3>

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

            <div
                className='form-container'
                style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: 'auto' }}
            >
                <p>{props.data.map((e) => {
                    return e.name
                })}</p>
                {[props.data[current - 1]].map((event) => {
                    // console.log('attr index ' + currentAttrIndex)
                    switch (event.type) {
                        case 'String':
                            if (event.values.length > 10) {
                                return (
                                    <div>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id={event.id}>{event.name}</InputLabel>
                                            <Select id={event.id} value={selectSelect}>
                                                {event.values.map(f => {
                                                    return (
                                                        <MenuItem
                                                            value={f.value}
                                                            key={f.value}
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
                            } else if (event.values.length === 0) {
                                return (
                                    <TextField
                                        value={text}
                                        onChange={e => handleTextInput(event.name, e.target.value)}
                                        placeholder={'Personalize your item'}
                                    />
                                )
                            } else {
                                return (
                                    <div>
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
                                                        className={classes.formBtn}
                                                        key={f.value}
                                                    >
                                                        {f.label}
                                                    </Button>
                                                )
                                            })}
                                        </ButtonGroup>
                                    </div>
                                )
                            }
                            // eslint-disable-next-line no-unreachable
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
                            if (event.assetType === 'upload') {
                                return <DropzoneArea
                                    filesLimit={1}
                                //   onChange={handleUpload}
                                />
                            } else if (event.values.length > 10) {
                                return (
                                    <div>
                                        {/* <p>Part-Ref Long {event.name}</p> */}
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id={event.id}>{event.name}</InputLabel>
                                            <Select id={event.id} value={selectSelect}>
                                                {event.values.map(f => {
                                                    return (
                                                        <div
                                                            key={f.assetId}
                                                        >
                                                            {checkNested(props.data[currentAttrIndex]) ? (
                                                                <NestedForm data={checkNested(props.data[currentAttrIndex])} />
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
                                return (
                                    <div>
                                        <ButtonGroup
                                            color='primary'
                                            orientation={`${matches ? `horizontal` : `vertical`}`}
                                            className={classes.formBtn}

                                        >
                                            {event.values.map((f) => {
                                                return (
                                                    <div
                                                        key={f.assetId}
                                                    >
                                                        {checkNested(props.data[currentAttrIndex]) ? (
                                                            <NestedForm data={checkNested(props.data[currentAttrIndex])} />
                                                        ) : null}
                                                        <Button
                                                            variant='contained'
                                                            startIcon={checkNested(props.data[currentAttrIndex]) ? <TuneIcon /> : null}
                                                            onClick={() =>
                                                                handlePartRef(event.name, f.assetId, event)
                                                            }
                                                            className={classes.formBtn}
                                                        >
                                                            {f.label}
                                                        </Button>
                                                    </div>
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
