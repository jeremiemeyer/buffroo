import { useContext } from "react"
import SessionsContext from "@/context/api/SessionsProvider"

export default function useSessions() {
  const context = useContext(SessionsContext)
  return context
}


