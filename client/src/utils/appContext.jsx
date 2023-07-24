import React, { createContext, useReducer } from 'react';

// make context base
/** @type {{tooken:undefined|string, user: {email, _id,}}} */
const baseContext = {
	token: undefined,
	user: undefined,
};

const dispatch = (action) => {};

const initialContext = {
	...baseContext,
	dispatch,
};
// make context
const appContext = createContext(initialContext);

// make reducer
const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_USER':
			return {
				...state,
				user: action.payload,
			};
		case 'SET_TOKEN':
			return {
				...state,
				token: action.payload,
			};

		default:
			return state;
	}
};

// make context provider
export const AppContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, baseContext);

	const value = { ...state, dispatch };
	return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default appContext;
