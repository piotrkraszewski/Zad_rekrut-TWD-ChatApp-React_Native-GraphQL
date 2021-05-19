import React,{ useState, useEffect, createContext, useContext } from 'react'


const AppContext = createContext()
export function useAppContext(){
  return useContext(AppContext)
}


export default function AppProvider({children}){
  const [userData, setUserData] = useState()
  const [currentChatingUserID, setCurrentChatingUserID] = useState('')
  const [currentRoomID, setCurrentRoomID] = useState('')


  return (
    <AppContext.Provider value={{userData, setUserData, currentChatingUserID, setCurrentChatingUserID, currentRoomID, setCurrentRoomID}}>
      {children}
    </AppContext.Provider>
  )
}