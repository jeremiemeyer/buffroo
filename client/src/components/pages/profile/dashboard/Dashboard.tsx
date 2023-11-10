//@ts-nocheck
import ExerciseProgress from "./ExerciseProgress"
import WorkoutsPerWeek from "./WorkoutsPerWeek"
import {
  Button,
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
  EditIcon,
  RepeatClockIcon,
  AddIcon,
} from "@chakra-ui/icons"
import { AiOutlinePlus } from "react-icons/ai"
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import AddWidgetModal from "./AddWidgetModal"
import ExerciseBestSet from "./ExerciseBestSet"
import ExerciseVolume from "./ExerciseVolume"

export default function Dashboard({ userData, updateUserData }) {
  const [showAddWidgetModal, setShowAddWidgetModal] = useState(false)
  // const [sortedUserDashboardData, setSortedUserDashboardData] = useState(null)

  // useEffect(() => {
  //   setSortedUserDashboardData(
  //     [...userData.dashboard].sort((a, b) => a.position - b.position)
  //   )
  // }, [userData])

  

  return (
    <>
      {/* entourloupe stylistique, à revoir */}
      {/* <button onClick={() => console.log(userData.dashboard)}>
        consolelog userData.dashboard
      </button> */}
      <div className="flex flex-row justify-between mx-auto">
        <h1 className="text-3xl font-semibold mb-4 px-4 dark:text-white dark:text-opacity-90">Dashboard</h1>
        <div>
          <Button
            onClick={() => setShowAddWidgetModal(true)}
            leftIcon={<Icon as={AiOutlinePlus} />}
            textColor="rgba(14,165,233,1)" //sky-500
            bg={"rgba(186,230,253,0.4)"}
            _hover={{ bg: "rgba(186,230,253,0.8)" }}
          >
            widget
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {userData &&
          userData.dashboard.map((element, index) => {
            if (element.type === "workoutsPerWeek") {
              return (
                <WorkoutsPerWeek
                  key={index}
                  userData={userData}
                  updateUserData={updateUserData}
                  widgetData={element}
                />
              )
            } else if (element.type === "exerciseBestSet") {
              return (
                <ExerciseBestSet
                  key={index}
                  userData={userData}
                  updateUserData={updateUserData}
                  widgetData={element}
                />
              )
            } else if (element.type === "exerciseVolume") {
              return (
                <ExerciseVolume
                  key={index}
                  userData={userData}
                  updateUserData={updateUserData}
                  widgetData={element}
                />
              )
            }
          })}
          {userData.length == 0 && <p>Your dashboard is empty. You can add a widget using the button above.</p>}
      </div>
      {showAddWidgetModal &&
        createPortal(
          <AddWidgetModal onClose={() => setShowAddWidgetModal(false)} />,
          document.body
        )}
    </>
  )
}
