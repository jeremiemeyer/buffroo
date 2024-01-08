//@ts-nocheck
import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "@/hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()

  if (auth) {
    if (auth.roles) {
      const hasAllowedRole = auth.roles.some((role) =>
        allowedRoles.includes(role)
      )
      if (hasAllowedRole) {
        return <Outlet />
      }
    }
    if (auth.user) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />
    }
  }

  return <Navigate to="/" state={{ from: location }} replace />
}
export default RequireAuth
