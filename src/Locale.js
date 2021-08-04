import { Translate } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useContextData, useUpdateContext } from './contextProvider';

export default function Locale(props) {
    const [languages, setLanguages] = useState([]);
    const data = useContextData()
    const setData = useUpdateContext()

    useEffect(() => {
        setLanguages(getLanguages())
        props.translate()
    }, [props]);

    function getLanguages() {
        // var myHeaders = new Headers();
        // myHeaders.append("authorization", "Bearer {access-token}");

        // var requestOptions = {
        //     method: 'GET',
        //     headers: myHeaders,
        //     redirect: 'follow'
        // };

        // return fetch("https://admin.demo.threekit.com/org/" + props.userId, requestOptions)
        //     .then(response => response.json())
        //     .then(result => result.language.values)
        //     .catch(error => console.log('error', error));
        let dummy = {
            language: {
                values: [
                    {
                        label: "chinois simplifie",
                        value: "EN"
                    },
                    {
                        label: "Francais",
                        value: "FR"
                    }
                ],
                defaultValue: "ZH"
            },
        }
        return dummy.language.values
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