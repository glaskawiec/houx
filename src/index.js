import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const Context = createContext(null);

const createStoreWithReducers = reducers => (state, action) => {
    const combinedReducers = {};
    const schemaEntries = Object.entries(reducers);
    schemaEntries.forEach((e) => {
        const [namespace, reducer] = e;
        combinedReducers[namespace] = reducer(state && state[namespace], action);
    });
    return combinedReducers;
};

const compose = (...functions) => x => functions.reduceRight((composed, f) => f(composed), x);

const createStore = (reducers, middlewares) => {
    const rootReducer = createStoreWithReducers(reducers);
    const initialState = rootReducer();
    const [state, dispatch] = useReducer(rootReducer, initialState);

    if (middlewares) {
        const middlewareAPI = {
            getState: () => state,
            dispatch: action => dispatch(action),
        };
        const chain = middlewares.map(middleware => middleware(middlewareAPI));
        const enhancedDispatch = compose(...chain)(dispatch);
        return { state, dispatch: enhancedDispatch };
    }

    return [state, dispatch];
};


export const HouxProvider = ({ children, reducers, middlewares }) => {
    const store = createStore(reducers, middlewares);
    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    );
};

HouxProvider.propTypes = {
    children: PropTypes.element.isRequired,
    middlewares: PropTypes.arrayOf(PropTypes.func),
    reducers: PropTypes.objectOf(PropTypes.func).isRequired,
};

HouxProvider.defaultProps = {
    middlewares: null,
};

export const useHoux = () => useContext(Context);
