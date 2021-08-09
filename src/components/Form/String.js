import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250
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

export default function StringComponent(props) {
    const classes = useStyles()

    if (props.e.values.length > 0) {
        return (
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id={props.e.id}>{props.e.name}</InputLabel>
                    <Select id={props.e.id} value={props.selectSelect}

                    >
                        {props.e.values.map(f => {
                            return (
                                <MenuItem
                                    value={f.value}
                                    onClick={() => props.handleString(props.e.name, f.value)}
                                >
                                    {f.label}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
        )
    } else if (props.e.values.length == 0) {
        return (
            <TextField
                value={props.text}
                onChange={e => props.handleTextInput(props.e.name, e.target.value)}
                placeholder={'Personalize your item'}
            />
        )
    } else {
        return (
            props.e.values.map(f => {
                return (
                    <Grid item xs={12} sm={6} md={4} align="center">
                        <Button
                            onClick={() =>
                                props.handleString(props.e.name, f.value, props.e)
                            }
                            style={{
                                width: "70%",
                                minHeight: "100%",
                            }}
                        >
                            <Paper
                                elevation={1}
                                style={{
                                    textAlign: 'center',
                                    width: "100%",
                                    minHeight: "100%",
                                    color: '#044849',

                                }}>{f.label}</Paper>
                        </Button>
                    </Grid>
                )
            })

        )
    }
}