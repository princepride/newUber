import React, { createContext, useContext, useState, useEffect } from 'react';
import { userProfile } from '../data/userProfile'
import Axios from 'axios';

const initialState = {
    schedule: false,
    setTime:false,
}
const StateContext = createContext();



export const ContextProvider = ({ children }) => {
    const [isClicked, setIsClicked] = useState(initialState);
    const [scheduleTime, setScheduleTime] = useState(new Date());
    const [profile, setprofile] = useState(userProfile);
    //const [profile, setprofile] = useState(userProfile);

    useEffect(() => {
        let isMounted = true;
        Axios.put("http://localhost:3001/uberdata", { firstname: 'Zhipeng', lastname: 'Wang'}).then((respose) => {
            if(isMounted) {
                setprofile(respose.data);
            }
        })
        return () => { isMounted = false }
    }, [])

    const handleClick = (clicked) => setIsClicked( {...initialState, [clicked]: true})
    return (
        <StateContext.Provider value={{isClicked, handleClick,
        scheduleTime, setScheduleTime, profile, setprofile}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

