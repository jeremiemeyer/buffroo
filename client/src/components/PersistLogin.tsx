//@ts-nocheck
import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"
import useLocalStorage from "../hooks/useLocalStorage"
import LoadingPage from "./LoadingPage"

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const { auth } = useAuth()
  const [persist] = useLocalStorage("persist", false)

  useEffect(() => {
    let isMounted = true

    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

    return () => (isMounted = false)
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`accessToken: ${JSON.stringify(auth?.accessToken)}`)
  }, [isLoading])

  return <>{!persist ? <Outlet /> : isLoading ? <LoadingPage /> : <Outlet />}</>
}

export default PersistLogin
