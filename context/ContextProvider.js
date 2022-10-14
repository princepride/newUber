import React, { createContext, useContext, useState } from 'react';

const initialState = {
    schedule: false,
}
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [isClicked, setIsClicked] = useState(initialState);
    const handleClick = (clicked) => setIsClicked( {...initialState, [clicked]: true})
    return (
        <StateContext.Provider value={{isClicked, handleClick}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

