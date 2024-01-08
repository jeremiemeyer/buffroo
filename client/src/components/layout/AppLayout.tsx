//@ts-nocheck
import { Outlet } from "react-router-dom"
import WorkoutModal from "@/components/pages/workout-modal/WorkoutModal.tsx"
import Navbar from "@/components/layout/Navbar/Navbar"
import Stopwatch from "@/components/pages/workout-modal/Stopwatch"
import useWorkoutStatus from "@/hooks/useWorkoutStatus"
import useWorkoutData from "@/hooks/useWorkoutData"
import useTheme from "@/hooks/useTheme.tsx"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import { Menu, MenuButton, IconButton } from "@chakra-ui/react"
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons"
import { Toaster } from "react-hot-toast"
import Title from "./Title"

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
        {/* Title  */}
        <Title />
        {/* title avec le logo qui zoom out */}
        <Outlet />
        <Navbar />
      </div>
      <div className="fixed w-full bottom-0 transform translate-y-[-90px] z-[900]">
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

      {/* If a workout is in progress, it appears either in full screen with a modal, or as a minimized component */}
      {
        workoutIsInProgress &&
          (!sessionWindowIsMinimized ? (
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
                    sessionWindowIsMinimized ? (
                      <ArrowUpIcon />
                    ) : (
                      <ArrowDownIcon />
                    )
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
          )) // version réduite
      }
    </>
  )
}
