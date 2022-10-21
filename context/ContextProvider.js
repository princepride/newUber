import React, { createContext, useContext, useState, useEffect } from 'react';
import { userProfile } from '../data/userProfile'


const initialState = {
    schedule: false,
    setTime:false,
}
const StateContext = createContext();



export const ContextProvider = ({ children }) => {
    const [isClicked, setIsClicked] = useState(initialState);
    const [scheduleTime, setScheduleTime] = useState(new Date());
    const [profile, setprofile] = useState(userProfile);
    const [login, setLogin] = useState(false);
    const [chats, setChats] = useState([
        //{
        //  name: 'bot',
        //  text: "please input your drop-off location"
        //},
        {
            name: 'bot',
            text: "please input your drop-off location"
          },
      ]);
    //const [profile, setprofile] = useState(userProfile);

    const handleClick = (clicked) => setIsClicked( {...initialState, [clicked]: true})
    return (
        <StateContext.Provider value={{isClicked, handleClick,
        scheduleTime, setScheduleTime, profile, setprofile,
        login, setLogin,chats, setChats}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

