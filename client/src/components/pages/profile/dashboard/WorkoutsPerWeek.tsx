//@ts-nocheck

import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Icon,
} from "@chakra-ui/react"
import {
  HamburgerIcon,
  DeleteIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  EditIcon,
  RepeatClockIcon,
} from "@chakra-ui/icons"
import { FaEllipsisH } from "react-icons/fa"
import { GoGoal } from "react-icons/go"
import useSessions0 from "@/hooks/api/useSessions"
import { createPortal } from "react-dom"
import { useState } from "react"
import { create } from "domain"
import EditWorkoutsPerWeekModal from "./EditWorkoutsPerWeekModal"
import useSessions from "@/hooks/api/useSessions"
import { aggregateWorkoutsByWeek } from "@/utils/dashboard/aggregateWorkoutsByWeek"
import WorkoutsPerWeekBarChart from "./charts/WorkoutsPerWeekBarChart"
import useUserData from "@/hooks/api/useUserData"
import useAuth from "@/hooks/useAuth"
import useToast from "@/hooks/useToast"

export default function WorkoutsPerWeek({
  userData,
  updateUserData,
  widgetData,
}) {
  const [showEditWorkoutsPerWeekModal, setShowEditWorkoutsPerWeekModal] =
    useState(false)
  const { sessionsData } = useSessions()
  const aggregatedData = aggregateWorkoutsByWeek(sessionsData)
  const { auth } = useAuth()
  const { preferencesSaved } = useToast()
  // const { userData, setUserData } = useUserData()

  // marche
  async function handleDelete() {
    const updatedUserData = {
      ...userData,
      dashboard: [...userData.dashboard.filter((el) => el._id !== widgetId)],
    }
    const success = await updateUserData({
      userId: auth.userId,
      updatedUserData: updatedUserData,
    })
    if (success === true) {
      preferencesSaved()
    }
    // console.log(updatedUserData)
  }

  // function getLastUsedPosition(array) {
  //   let lastUsedPosition = 0
  //   for (const index in array) {
  //     if (array[index].position > lastUsedPosition) {
  //       lastUsedPosition = array[index].position
  //     }
  //   }
  //   return lastUsedPosition
  // }

  async function moveWidgetAfter() {
    let updatedDashboardData = userData.dashboard
    // Find the index of the widget to move.
    const widgetIndex = updatedDashboardData.findIndex(
      (widget) => widget._id === widgetData._id
    )

    // If the widget is the last element in the array, do nothing.
    if (widgetIndex === updatedDashboardData.length - 1) {
      return
    }

    // Swap the widget with the next widget in the array.
    const widget = updatedDashboardData[widgetIndex]
    const nextWidget = updatedDashboardData[widgetIndex + 1]
    updatedDashboardData[widgetIndex] = nextWidget
    updatedDashboardData[widgetIndex + 1] = widget

    // console.log({...userData, dashboard: updatedDashboardData})
    const success = await updateUserData({
      userId: auth.userId,
      updatedUserData: { ...userData, dashboard: updatedDashboardData },
    })
    if (success === true) {
      preferencesSaved()
    }
  }

  async function moveWidgetBefore() {
    let updatedDashboardData = userData.dashboard
    // Find the index of the widget to move.
    const widgetIndex = updatedDashboardData.findIndex(
      (widget) => widget._id === widgetData._id
    )

    // If the widget is the first element in the array, do nothing.
    if (widgetIndex === 0) {
      return
    }

    // Swap the widget with the next widget in the array.
    const widget = updatedDashboardData[widgetIndex]
    const previousWidget = updatedDashboardData[widgetIndex - 1]
    updatedDashboardData[widgetIndex - 1] = widget
    updatedDashboardData[widgetIndex] = previousWidget

    const success = await updateUserData({
      userId: auth.userId,
      updatedUserData: { ...userData, dashboard: updatedDashboardData },
    })
    if (success === true) {
      preferencesSaved()
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center border border-gray-200 bg-white rounded-3xl p-6 max-w-[800px] mx-auto">
        {/* <button onClick={() => console.log(userData)}>
          consolelog userData
        </button> */}
        {/* <button onClick={() => console.log(sessionsData)}>
          Consolelog sessionsData
        </button>
        <button onClick={() => console.log(aggregatedData)}>
          Consolelog aggregatedData
        </button> */}

        <div className="flex flex-row items-center pb-8">
          {/* <button onClick={() => console.log(widgetId)}>consolelog widgetId</button> */}
          <h1 className="font-semibold text-xl flex grow ">Workouts/week</h1>
          <h2 className="px-4 font-semibold">
            Goal:{" "}
            <span className="font-normal">
              {userData.goals.workoutsPerWeek}
            </span>
          </h2>
          <div className="space-x-2">
            {" "}
            <Menu variant="filled">
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<Icon as={GoGoal} />}
                textColor="rgba(14,165,233,1)" //sky-500
                bg={"rgba(186,230,253,0.4)"}
                _hover={{ bg: "rgba(186,230,253,0.8)" }}
                outlineOffset={-1}
                onClick={() => setShowEditWorkoutsPerWeekModal(true)}
                className="hover:bg-gray-200"
              />
            </Menu>
            <Menu variant="filled">
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<Icon as={FaEllipsisH} />}
                textColor="rgba(14,165,233,1)" //sky-500
                bg={"rgba(186,230,253,0.4)"}
                _hover={{ bg: "rgba(186,230,253,0.8)" }}
                outlineOffset={-1}
                //   onClick={() => setSelectedExerciseId(exerciseId)}
                className="hover:bg-gray-200"
              />
              <MenuList zIndex={"600"}>
                <MenuItem
                  onClick={moveWidgetBefore}
                  icon={<ArrowUpIcon />}
                  // command="⌘N"
                >
                  Move Before
                </MenuItem>
                <MenuItem
                  // onClick={moveExerciseAfter}
                  onClick={moveWidgetAfter}
                  icon={<ArrowDownIcon />}
                  // command="⌘N"
                >
                  Move After
                </MenuItem>
                <MenuItem
                  icon={<DeleteIcon />}
                  onClick={handleDelete}
                  // command="⌘T"
                >
                  Remove
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <div className="flex justify-center">
          <WorkoutsPerWeekBarChart
            aggregatedData={aggregatedData}
            goalValue={userData.goals.workoutsPerWeek}
          />
        </div>
      </div>
      {showEditWorkoutsPerWeekModal &&
        createPortal(
          <EditWorkoutsPerWeekModal
            onClose={() => setShowEditWorkoutsPerWeekModal(false)}
            userData={userData}
            updateUserData={updateUserData}
          />,
          document.body
        )}
    </>
  )
}
