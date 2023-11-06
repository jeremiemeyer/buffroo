//@ts-nocheck
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import ExercisesContext from "@/context/api/ExercisesProvider"

export default function useExercises() {
  const context = useContext(ExercisesContext)
  return context
}
