//@ts-nocheck
import { createContext, useState, useEffect } from "react"
import useUserData from "@/hooks/api/useUserData"
import { useColorMode } from "@chakra-ui/react"

const ThemeContext = createContext({})

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("dark")
    const {userData} = useUserData()
    const { colorMode, toggleColorMode } = useColorMode()

    useEffect(() => {
      if (userData && userData.preferences && userData.preferences.theme) {
        setTheme(userData.preferences.theme)

        // Chakra UI: makes sure the colorMode matches the one we fetched from the user preferences
        if (colorMode !== userData.preferences.theme){
          toggleColorMode()
        }
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