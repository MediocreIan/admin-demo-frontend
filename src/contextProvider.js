/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';

const Context = React.createContext()
const UpdateContext = React.createContext()

export function useContextData() {
    return useContext(Context)
}

export function useUpdateContext() {
    return useContext(UpdateContext)
}

export function ContextProvider({ children }) {
    const [context, setContext] = useState(null);
    function setTest(string) {
        setContext(string)
    }
    return (
        <Context.Provider value={context}>
            <UpdateContext.Provider value={setTest}>
                {children}
            </UpdateContext.Provider>
        </Context.Provider>
    )
}