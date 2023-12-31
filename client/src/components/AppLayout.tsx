//@ts-nocheck
import { Outlet } from "react-router-dom"
import WorkoutModal from "./workout/WorkoutModal"
import useWorkoutStatus from "../hooks/useWorkoutStatus"
import useWorkoutData from "../hooks/useWorkoutData"
import useWorkoutTimer from "../hooks/useWorkoutStopwatch.tsx"
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
import useTheme from "@/hooks/useTheme.tsx"

export const AppLayout = () => {
  // const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const {
    workoutIsInProgress,
    setWorkoutIsInProgress,
    sessionWindowIsMinimized,
    setSessionWindowIsMinimized,
  } = useWorkoutStatus()

  const { workoutData } = useWorkoutData()
  const { theme } = useTheme()

  useEffect(() => {
    if (workoutIsInProgress & !sessionWindowIsMinimized) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [workoutIsInProgress, sessionWindowIsMinimized])

  return (
    <>
      <div className="max-w-[900px] mx-auto min-h-screen">
        <Outlet />
      </div>
      <div className="fixed w-full bottom-0 transform translate-y-[-80px] z-[900]">
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: "",
            style:
              theme === "dark"
                ? {
                    border: "1px solid #374151",
                    background: "bg-glassmorphism2",
                    backgroundColor: "#1f2937",
                    color: "white",
                  }
                : "",
          }}
        />
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
            className="z-[500] fixed bottom-[55px] bg-glassmorphism dark:bg-gray-600 dark:hover:bg-gray-500 dark:hover:bg-opacity-50 dark:bg-opacity-50 cursor-pointer text-slate-900 w-full px-6 justify-center mx-auto my-1 rounded-2xl"
          >
            <Menu>
              <MenuButton
                as={IconButton}
                className="hover:bg-slate-300 dark:hover:bg-gray-600 dark:text-white dark:text-opacity-80"
                aria-label="Options"
                onClick={() => setSessionWindowIsMinimized(false)}
                icon={
                  sessionWindowIsMinimized ? <ArrowUpIcon /> : <ArrowDownIcon />
                }
                variant="filled"
              />
            </Menu>
            <p className="dark:text-white dark:text-opacity-80">
              <Stopwatch />
            </p>
            <p className="text-2xl font-light pb-4 dark:text-white dark:text-opacity-80">
              {workoutData.name}
            </p>
          </div>
        ) // version réduite
      ) : (
        <p></p>
      )}
    </>
  )
}
