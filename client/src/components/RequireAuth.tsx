//@ts-nocheck
import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Navbar from "./layout/Navbar/Navbar"
import WorkoutModal from "./modals/Workout/WorkoutModal"

const AppLayout = () => {
  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        <Outlet />
      </div>
      <Navbar />
    </>
  )
}
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <AppLayout />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
