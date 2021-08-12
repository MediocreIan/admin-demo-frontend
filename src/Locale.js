/* eslint-disable react/prop-types */
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import React, { useState, useEffect } from 'react';
import LocalePortal from './localePortal';
import { Typography } from '@material-ui/core';

export default function Locale(props) {
    const [languages, setLanguages] = useState([]);
    const [key, setKey] = useState(0)
    const [activeLanguage, setactiveLanguage] = useState();

    useEffect(async () => {
        if (key >= 0) {
            let languages = await getLanguages()
            setLanguages(languages)
            props.translate(window.player.getTranslations())
            setKey(key - 1)
        }
    }, [props, key]);

    useEffect(() => {
        setactiveLanguage(languages[0])
    }, [languages]);

    async function getLanguages() {
        var myHeaders = new Headers();
        myHeaders.append("authorization", "Bearer {access-token}");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let translations = await fetch("https://admin.demo.threekit.com/translations/" + props.userId, requestOptions)
            .then(response => response.json())
            .catch(error => console.log('error', error));

        return translations.values
    }
    let handleChange = async (e) => {
        await window.player.setLocale(e.target.value)
        props.translate(window.player.getTranslations(e))
        setKey(key + 1)
    }




    return (props.playerLoaded && languages.length > 0 ? (
        <LocalePortal>
            <div
                style={{
                    position: 'absolute',
                    bottom: '3px',
                    left: "3px"
                }}
                value={languages[0]}
            >
                <Typography variant="caption">language</Typography>
                <Select
                    placeholder="language"
                    onChange={(e) => {
                        handleChange(e)
                    }
                    }
                    value={activeLanguage ?? "language"}
                >
                    {
                        languages.length > 1 ? languages.map((language) => {
                            return (
                                <MenuItem
                                    key={language.value}
                                    value={language.value}
                                >{language.label}</MenuItem>
                            )
                        }) : null
                    }
                </Select >
            </div>
        </LocalePortal>
    ) : null
    )
}