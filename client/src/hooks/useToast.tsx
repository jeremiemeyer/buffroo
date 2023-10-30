//@ts-nocheck
import { useContext } from "react"
import ToastContext from "../context/ToastProvider"

export default function useToast() {
  const context = useContext(ToastContext)
  return context
}
