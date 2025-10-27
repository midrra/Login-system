import React,{createContext, useState}from 'react'

export const AppContext = createContext()
function AuthProvider({children}) {
const [user,setUser] = useState();
const [error,setError] = useState();
const value = {
    user,
    error,
    setUser,
    setError
}
  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  )
}

export default AuthProvider