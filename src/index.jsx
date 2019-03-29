import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const Context = createContext({});

const composeReducers = reducers => (state, action) => {
  const combinedReducers = {};
  const schemaEntries = Object.entries(reducers);
  schemaEntries.forEach((e) => {
    const [namespace, reducer] = e;
    combinedReducers[namespace] = reducer(state && state[namespace], action);
  });
  return combinedReducers;
};

const createStore = (reducers, logDispatchedActions) => {
  const rootReducer = composeReducers(reducers);
  const initialState = rootReducer(undefined, { type: 'STATE_INIT' });
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const localDispatch = (action) => {
    // enable simple logger
    if (logDispatchedActions && action.type) {
      console.info(action);
    }

    // async actions support
    if (typeof action === 'function') {
      return action(localDispatch, state);
    }

    return dispatch(action);
  };

  return { state, dispatch: localDispatch };
};

export const HouxProvider = ({ children, reducers, logDispatchedActions }) => {
  const store = createStore(reducers, logDispatchedActions);
  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
};

HouxProvider.propTypes = {
  children: PropTypes.element.isRequired,
  logDispatchedActions: PropTypes.bool,
  reducers: PropTypes.objectOf(PropTypes.func).isRequired,
};

HouxProvider.defaultProps = {
  logDispatchedActions: false,
};

export const useHoux = () => useContext(Context);
