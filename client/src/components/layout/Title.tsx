//@ts-nocheck
import "@fontsource/inconsolata"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import logo from "./../../assets/icon.svg"
import { Squircle } from "corner-smoothing"
import {
  IconSquircle,
  IconSquircleDark,
  IconSquircleLight,
} from "../StyledComponents"
import { IoPerson } from "react-icons/io5"
import useTheme from "@/hooks/useTheme"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  Portal,
} from "@chakra-ui/react"
import Settings from "../pages/dashboard/Settings"
import useUserData from "@/hooks/api/useUserData"
import useWorkoutStatus from "@/hooks/useWorkoutStatus"
import useAuth from "@/hooks/useAuth"
import useLogout from "@/hooks/useLogout"
import useToast from "@/hooks/useToast"

type TitleProps = {
  children: React.ReactNode
}

export default function Title({ children }: TitleProps) {
  const { theme } = useTheme()
  const { userData, updateUserData, isLoading } = useUserData()
  const { workoutIsInProgress } = useWorkoutStatus()
  const {auth} = useAuth()
  const logout = useLogout()
  const { cannotLogOutWorkoutInProgress, preferencesSaved } = useToast()

  const titles = [
    { path: "/dashboard", title: "Dashboard" },
    { path: "/history", title: "History" },
    { path: "/start", title: "Start Workout" },
    { path: "/exercises", title: "Exercises" },
  ]
  const location = useLocation()
  const currentTitle =
    titles.find((title) => location.pathname.startsWith(title.path))?.title ||
    "Unknown"

  const signOut = async () => {
    workoutIsInProgress ? cannotLogOutWorkoutInProgress() : await logout()
  }

  return (
    <>
      <div className="px-6 bg-glassmorphism2 bg-white bg-opacity-70 dark:bg-black/60 dark:border-gray-800  fixed top-0 left-0 w-full z-[10] items-center flex justify-between flex-row z-[500]">
        <motion.img
          initial={{ scale: 80, marginTop: "-400px", x: 1000, y: 1000 }}
          animate={{ scale: 1, marginTop: "0px", x: 0, y: 0 }} // Adjust the scale factor as needed
          transition={{ duration: 1, ease: "easeInOut", delay: "0.2" }} // Adjust the duration and easing function as needed
          className="w-[38px] z-[900]"
          src={logo}
          alt="logo"
        />
        <h1
          className="text-[36px] dark:text-white dark:text-opacity-90 h-[10%] z-50"
          style={{ fontFamily: "Inconsolata, monospace" }}
        >
          {currentTitle}
        </h1>

        <Popover>
          <PopoverTrigger>
            <Squircle
              borderWidth={2}
              cornerRadius={25}
              cornerSmoothing={1}
              as={theme === "dark" ? IconSquircleDark : IconSquircleLight}
              className="hover:scale-105 cursor-pointer"
            >
              <IoPerson />
            </Squircle>
          </PopoverTrigger>
          <Portal>
            <PopoverContent className="p-2 mt-2 mr-2">
              <PopoverArrow />
              <PopoverHeader>Profile</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody zIndex={600}>

                {isLoading ? '...' : <Settings userData={userData} updateUserData={updateUserData} />}
                

                <Button
                  variant="destructive"
                  onClick={signOut}
                  className="mt-12"
                >
                  Sign out
                </Button>
              </PopoverBody>
              {/* <PopoverFooter>This is the footer</PopoverFooter> */}
            </PopoverContent>
          </Portal>
        </Popover>
      </div>
    </>
  )
}
