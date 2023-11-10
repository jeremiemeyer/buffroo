//@ts-nocheck
import { useEffect, useState, useContext } from "react"
import UserDataContext from "@/context/api/UserDataProvider"

export default function useUserData() {
  const context = useContext(UserDataContext)
  return context
}