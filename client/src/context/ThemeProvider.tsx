//@ts-nocheck
import { createContext, useState, useEffect } from "react"
import useUserData from "@/hooks/api/useUserData"

const ThemeContext = createContext({})

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("light")
    const {userData} = useUserData()

    useEffect(() => {
      if (userData && userData.preferences && userData.preferences.theme) {
        setTheme(userData.preferences.theme)
      }
      if (theme === "dark") {
        document.body.classList.add("dark")
      } else {
        document.body.classList.remove("dark")
      }
    }, [userData, theme])
  
    const themeToggle = () => {
      setTheme(theme === "dark" ? "light" : "dark")
    }


  return (
    <ThemeContext.Provider value={{theme, setTheme, themeToggle}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext