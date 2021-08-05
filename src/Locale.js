import { Translate } from '@material-ui/icons';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import React, { useState, useEffect } from 'react';
import { useContextData, useUpdateContext } from './contextProvider';

export default function Locale(props) {
    const [languages, setLanguages] = useState([]);
    const data = useContextData()
    const setData = useUpdateContext()

    useEffect(async () => {
        console.log("locale")
        let languages = await getLanguages()
        setLanguages(languages)
        props.translate()
    }, [props]);

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

        console.log(translations.values)
        return translations.values
    }





    return (
        <div
            style={{
                position: 'absolute',
                bottom: '5px',
                left: "5px"
            }}
        >
            <p
                style={{
                    fontSize: '10px'
                }}
            >language</p>
            <Select
                onChange={(e) => {
                    window.player.setLocale(e.target.value)
                    props.translate()
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
    )
}