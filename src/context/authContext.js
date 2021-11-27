import { createContext, useState } from "react"


export const authContext = createContext('no-provider')


export default function AuthContextProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem('token'))    

    const [isAuthenticated, setAuthentication] = useState(!!token)

    const addToken = (token) => {
        setToken(token)
        setAuthentication(true)
        localStorage.setItem("token", token)
    }
    const removeToken = () => {
        setToken()
        setAuthentication(false)
        localStorage.removeItem("token")
    }

    return (
        <authContext.Provider value={{ addToken, isAuthenticated, removeToken }}>
            {children}
        </authContext.Provider>
    )
}
