import { Translate } from '@material-ui/icons';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import React, { useState, useEffect } from 'react';
import { useContextData, useUpdateContext } from './contextProvider';
import LocalePortal from './localePortal';

export default function Locale(props) {
    const [languages, setLanguages] = useState([]);
    const data = useContextData()
    const setData = useUpdateContext()
    const [key, setKey] = useState(0)

    useEffect(async () => {
        console.log('reload')
        let languages = await getLanguages()
        setLanguages(languages)
        props.translate(window.player.getTranslations())

    }, [props, key]);

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
        console.log("before", window.player.getTranslations())
        await window.player.setLocale(e.target.value)
        console.log("after", window.player.getTranslations())
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
            >
                <p
                    style={{
                        fontSize: '10px'
                    }}
                >language</p>
                <Select
                    onChange={(e) => {
                        handleChange(e)
                    }
                    }
                // value={languages[0]}
                >
                    {
                        languages.length > 1 ? languages.map((language) => {
                            return (
                                <MenuItem
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