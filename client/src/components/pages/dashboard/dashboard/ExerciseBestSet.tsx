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
import { DeleteIcon, ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons"
import { FaEllipsisH } from "react-icons/fa"
import useExercises from "@/hooks/api/useExercises"
import useSessions from "@/hooks/api/useSessions"
import { useEffect, useState } from "react"
import { ExerciseBestSetLineChart } from "./charts/ExerciseBestSetLineChart"
import useAuth from "@/hooks/useAuth"
import useToast from "@/hooks/useToast"
import SquircleTile from "@/components/ui/squircle-tile"

export default function ExerciseBestSet({
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

  // refaire sans modifier ordre des éléments
  async function handleSelectExercise(e) {
    setSelectedExerciseId(e.target.value)
    const dashboardWithoutThisWidget = userData.dashboard.filter(
      (el) => el._id !== widgetData._id
    )
    const updatedUserDashboard = [
      ...dashboardWithoutThisWidget,
      {
        type: "exerciseBestSet",
        exerciseId: e.target.value,
        position: widgetData.position,
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
      dashboard: [
        ...userData.dashboard.filter((el) => el._id !== widgetData._id),
      ],
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
    <div className="relative">
      <Menu variant="filled">
      <div className="absolute top-5 right-4 mr-2 z-[1]">

        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Icon as={FaEllipsisH} />}
          textColor="rgba(14,165,233,1)" //sky-500
          bg={"rgba(186,230,253,0.4)"}
          _hover={{ bg: "rgba(186,230,253,0.8)" }}
          outlineOffset={-1}
          className="hover:bg-gray-200"
        />
        </div>
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
      <SquircleTile>
        <div className="flex flex-row items-center pb-8">
          <h1 className="font-semibold text-xl flex grow dark:text-white dark:text-opacity-90">
            Best set
          </h1>

          <h2 className="px-4 mr-8">
            <Select
              placeholder="Exercise name"
              value={selectedExerciseId && selectedExerciseId}
              onChange={(e) => handleSelectExercise(e)}
              className="dark:bg-gray-600 dark:border-gray-600"
            >
              {exercisesData.map((exercise, index) => (
                <option key={index} value={exercise._id}>
                  {exercise.name}
                </option>
              ))}
            </Select>
          </h2>
        </div>
        <div className="flex justify-center">
          <ExerciseBestSetLineChart
            selectedExerciseId={selectedExerciseId}
            sessionsData={sessionsData}
          />
        </div>
      </SquircleTile>
    </div>
  )
}
