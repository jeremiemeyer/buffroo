import { useContext } from "react"
import TemplatesContext from "@/context/api/TemplatesProvider"

export default function useTemplates() {
  const context = useContext(TemplatesContext)
  return context
}