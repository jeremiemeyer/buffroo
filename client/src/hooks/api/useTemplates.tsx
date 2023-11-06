//@ts-nocheck
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import useAuth from "../useAuth"
import useAxiosPrivate from "../useAxiosPrivate"
import useToast from "../useToast"
import TemplatesContext from "@/context/api/TemplatesProvider"

export default function useTemplates() {
  const context = useContext(TemplatesContext)
  return context
}