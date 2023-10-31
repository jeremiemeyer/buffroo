//@ts-nocheck
import { useContext } from "react"
import TemplateDataContext from "@/context/TemplateDataProvider"

export default function useTemplateData() {
  const context = useContext(TemplateDataContext)
  return context
}
