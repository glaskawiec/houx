import React, { createContext, useContext, useReducer } from 'react';

const Context = createContext();

export const Provider = ({ store, children }) => (
    <Context.Provider value={useReducer(store, store())}>
        {children}
    </Context.Provider>
)

export function createStoreWithReducers(schema) {
    return (state, action) => {
        let combinedReducers = {};
        const schemaEntries = Object.entries(schema);
        schemaEntries.forEach((e) => {
            const [namespace, reducer] = e;
            combinedReducers[namespace] = reducer(state && state[namespace], action);
        })
        return combinedReducers;
    }
}

export const useHoux = () => useContext(Context);