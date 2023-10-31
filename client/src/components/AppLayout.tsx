//@ts-nocheck
import { Outlet } from "react-router-dom"
import WorkoutModal from "./workout/WorkoutModal"
import useWorkoutStatus from "../hooks/useWorkoutStatus"
import useWorkoutData from "../hooks/useWorkoutData"
import useWorkoutTimer from "../hooks/useWorkoutTimer"
import { useEffect, useState } from "react"
import Navbar from "@/components/layout/Navbar/Navbar"
import { createPortal } from "react-dom"
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
} from "@chakra-ui/react"
import { ArrowDownIcon, ArrowUpIcon, HamburgerIcon } from "@chakra-ui/icons"
import Stopwatch from "./workout/Stopwatch.tsx"
import { Toaster } from "react-hot-toast"

export const AppLayout = () => {
  // const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const {
    workoutIsInProgress,
    setWorkoutIsInProgress,
    sessionWindowIsMinimized,
    setSessionWindowIsMinimized,
  } = useWorkoutStatus()

  const { workoutData } = useWorkoutData()

  useEffect(() => {
    if (workoutIsInProgress & !sessionWindowIsMinimized) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [workoutIsInProgress, sessionWindowIsMinimized])

  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        <Toaster position="bottom-center" />
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
            onClick={() => setSessionWindowIsMinimized(false)}
            className="z-[500] fixed bottom-[55px] bg-glassmorphism cursor-pointer text-slate-900 w-full px-6 my-1 rounded-2xl"
          >
            <Menu>
              <MenuButton
                as={IconButton}
                className="hover:bg-slate-300"
                aria-label="Options"
                onClick={() => setSessionWindowIsMinimized(false)}
                icon={
                  sessionWindowIsMinimized ? <ArrowUpIcon /> : <ArrowDownIcon />
                }
                variant="filled"
              />
            </Menu>
            <Stopwatch />
            <p className="text-2xl font-light pb-4">{workoutData.name}</p>
          </div>
        ) // version réduite
      ) : (
        <p></p>
      )}
    </>
  )
}
