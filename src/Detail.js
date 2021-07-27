import React, { useState } from 'react';
import Form from "./components/Form"
import data from "./components/Form/data"
export default function Landing() {

    return(
        <>
        <h5>Detail</h5>
        <Form data={data}/>
        </>
    )
}