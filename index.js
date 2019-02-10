import React, { createContext, useContext, useReducer } from 'react';

export const Context = createContext();

export const Provider = ({ store, children }) => (
    <Context.Provider value={useReducer(store, store())}>
        {children}
    </Context.Provider>
)

export const createStoreWithReducers = (schema) => {
    return (state, action) => {
        let combinedReducers = {};
        const schemaEntries = Object.entries(schema);
        for (let i of schemaEntries) {
            const namespace = i[0];
            const reducerFcn = i[1];
            combinedReducers[namespace] = reducerFcn(state && state[namespace], action);
        }
        return combinedReducers;
    }
}

export const useHoux = () => useContext(Context);