//@ts-nocheck
import { useEffect, useState, useContext } from "react"
import UserDataContext from "@/context/api/UserDataProvider"

export default function useExercises() {
  const context = useContext(UserDataContext)
  return context
}