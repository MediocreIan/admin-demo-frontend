import React, { useState, useContext } from 'react';
import { useContextData, useUpdateContext } from './contextProvider';
export default function Landing() {
    const context = useContextData()
    const setContext = useUpdateContext()
    console.log(context)

    return (
        <>
            <h5>Detail</h5>
        </>
    )
}