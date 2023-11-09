//@ts-nocheck
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Icon,
  Select,
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
import useExercises from "@/hooks/api/useExercises"
import useSessions from "@/hooks/api/useSessions"
import { useEffect, useState } from "react"
import { ExerciseVolumesLineChart } from "./charts/ExerciseVolumeLineChart"
import { ExerciseBestSetLineChart } from "./charts/ExerciseBestSetLineChart"
import useAuth from "@/hooks/useAuth"
import useToast from "@/hooks/useToast"


export default function ExerciseVolume({
  userData,
  updateUserData,
  widgetData,
}) {
  const { exercisesData } = useExercises()
  const { sessionsData } = useSessions()
  const [selectedExerciseId, setSelectedExerciseId] = useState(null)
  const { auth } = useAuth()
  const { preferencesSaved } = useToast()

  useEffect(() => {
    if (exercisesData.length > 0) {
      setSelectedExerciseId(widgetData.exerciseId)
    }
  }, [exercisesData])

  async function handleSelectExercise(e) {
    setSelectedExerciseId(e.target.value)
    const dashboardWithoutThisWidget = userData.dashboard.filter(
      (el) => el._id !== widgetData._id
    )
    const updatedUserDashboard = [
      ...dashboardWithoutThisWidget,
      {
        type: "exerciseVolume",
        exerciseId: e.target.value,
        _id: widgetData._id,
      },
    ]
    const updatedUserData = { ...userData, dashboard: updatedUserDashboard }
    console.log("updatedUserData", updatedUserData)
    const success = await updateUserData({
      userId: auth.userId,
      updatedUserData: updatedUserData,
    })
    if (success === true) {
      preferencesSaved()
    }
  }

  async function handleDelete() {
    const updatedUserData = {
      ...userData,
      dashboard: [...userData.dashboard.filter((el) => el._id !== widgetData._id)],
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
    <div className="flex flex-col justify-center border border-gray-200 bg-white rounded-3xl p-6 max-w-[800px] mx-auto">
      <div className="flex flex-row items-center pb-8">
        <h1 className="font-semibold text-xl flex grow ">Volume</h1>
        {/* <button onClick={() => console.log(widgetData._id)}>widget id</button> */}

        <h2 className="px-4">
          <Select
            placeholder="Exercise name"
            value={selectedExerciseId && selectedExerciseId}
            onChange={(e) => handleSelectExercise(e)}
          >
            {exercisesData.map((exercise, index) => (
              <option key={index} value={exercise._id}>
                {exercise.name}
              </option>
            ))}
          </Select>
        </h2>
        <div className="space-x-2">
          {" "}
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
        {/* <button onClick={() => console.log(exercisesData)}>
        consolelog exercisesData
      </button> */}
        <ExerciseVolumesLineChart
          selectedExerciseId={selectedExerciseId}
          sessionsData={sessionsData}
        />
      </div>
    </div>
  )
}
