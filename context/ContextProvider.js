import React, { createContext, useContext, useState } from 'react';

const initialState = {
    schedule: false,
    setTime:false,
}
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [isClicked, setIsClicked] = useState(initialState);
    const [scheduleTime, setScheduleTime] = useState(new Date());
    const handleClick = (clicked) => setIsClicked( {...initialState, [clicked]: true})
    return (
        <StateContext.Provider value={{isClicked, handleClick,
        scheduleTime, setScheduleTime}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

