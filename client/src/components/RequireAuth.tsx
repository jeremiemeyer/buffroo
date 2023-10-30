//@ts-nocheck
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { createPortal } from "react-dom"
import WorkoutModal from "./workout/WorkoutModal.tsx"
import useAuth from "../hooks/useAuth"
import Navbar from "./layout/Navbar/Navbar"
import { useState, useEffect } from "react"
import WorkoutStatusContext from "../context/WorkoutStatusProvider"
import WorkoutDataContext from "../context/WorkoutDataProvider.tsx"

import useWorkoutStatus from "../hooks/useWorkoutStatus.tsx"
import useWorkoutData from "../hooks/useWorkoutData.tsx"
import { AppLayout } from "./AppLayout.tsx"

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
