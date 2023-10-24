//@ts-nocheck
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { createPortal } from "react-dom"
import WorkoutModal from "./workout/WorkoutModal.tsx"
import useAuth from "../hooks/useAuth"
import Navbar from "./layout/Navbar/Navbar"
import { useState, useContext } from "react"
import WorkoutStatusContext from "../context/WorkoutStatusProvider"
import WorkoutDataContext from "../context/WorkoutDataProvider.tsx"
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
} from "@chakra-ui/react"
import { ArrowDownIcon, ArrowUpIcon, HamburgerIcon } from "@chakra-ui/icons"
import Stopwatch from "./workout/Stopwatch.tsx"

const AppLayout = () => {
  // const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const {
    workoutIsInProgress,
    setWorkoutIsInProgress,
    sessionWindowIsMinimized,
    setSessionWindowIsMinimized,
  } = useContext(WorkoutStatusContext)

  const { workoutData } = useContext(WorkoutDataContext)

  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        <Outlet />
      </div>
      <Navbar />
      {workoutIsInProgress ? (
        !sessionWindowIsMinimized ? (
          createPortal(
            <WorkoutModal onClose={() => setWorkoutIsInProgress(false)} />,
            document.body
          )
        ) : (
          <div
            // onClick={(e) => e.stopPropagation()}
            className="z-[500] fixed bottom-[55px] bg-glassmorphism text-slate-900 w-full px-6 my-1 rounded-2xl"
          >
            <Menu>
              <MenuButton
                as={IconButton}
                className="hover:bg-slate-300"
                aria-label="Options"
                onClick={() =>
                  setSessionWindowIsMinimized(!sessionWindowIsMinimized)
                }
                icon={
                  sessionWindowIsMinimized ? <ArrowUpIcon /> : <ArrowDownIcon />
                }
                variant="filled"
              />
            </Menu>
            <Stopwatch />
            <p className="text-xl font-semibold pb-4">{workoutData.name}</p>
          </div>
        ) // version réduite
      ) : (
        <p></p>
      )}
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
