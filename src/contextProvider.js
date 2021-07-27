import { Update } from '@material-ui/icons';
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
    const [context, setContext] = useState({
        //context goes here
        test: 'test'
    });
    function setTest(string) {
        setContext({ ...context, test: string })
    }
    return (
        <Context.Provider value={context}>
            <UpdateContext.Provider value={setTest}>
                {children}
            </UpdateContext.Provider>
        </Context.Provider>
    )
}