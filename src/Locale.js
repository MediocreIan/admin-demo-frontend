import { Translate } from '@material-ui/icons';
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

        let translations = await fetch("https://admin.demo.threekit.com/translations/60ff1c3470e42ab5a64d0e12", requestOptions)
            .then(response => response.json())
            .catch(error => console.log('error', error));

        console.log(translations.values)
        return translations.values
    }





    return (
        <>
            {languages.length > 1 ? languages.map((language) => {
                return (
                    <p onClick={(e) => {
                        window.player.setLocale(language.value)
                        props.translate()
                    }}>{language.label}</p>
                )
            }) : null}
        </>
    )
}