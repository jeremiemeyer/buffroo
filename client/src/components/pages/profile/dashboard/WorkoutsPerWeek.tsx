//@ts-nocheck
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
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

const WorkoutsPerWeekBarChart = ({ aggregatedData, goalValue }) => {
  // Find the maximum value in your aggregated data
  const maxWorkouts = Math.max(...aggregatedData.map((item) => item.workouts))

  // Determine the domain range for the YAxis
  const yDomain = [0, Math.max(maxWorkouts, goalValue) + 1]

  return (
    <ResponsiveContainer width="99%" aspect={2}>
      <BarChart
        data={aggregatedData}
        margin={{
          top: 5,
          left: 10,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="week"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={true}
        />
        <YAxis
          width={15}
          datakey="workouts"
          domain={yDomain}
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
          tickFormatter={(value) => `${value}`}
          tickCount={Math.max(maxWorkouts, goalValue) + 2}
          interval={0}
        />
        <Bar dataKey="workouts" fill="rgb(37 99 235)" radius={[4, 4, 0, 0]} />
        <ReferenceLine y={goalValue} stroke="red" />
        <CartesianGrid horizontal={true} strokeDasharray="3 3" />
        {/* <Legend /> */}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default function WorkoutsPerWeek({ userData, updateUserData }) {
  const [showEditWorkoutsPerWeekModal, setShowEditWorkoutsPerWeekModal] =
    useState(false)
  const { sessionsData } = useSessions()
  const aggregatedData = aggregateWorkoutsByWeek(sessionsData)

  return (
    <>
      <div className="flex flex-col justify-center border border-gray-200 bg-white rounded-3xl p-6 max-w-[800px] mx-auto">
        {/* <button onClick={() => console.log(sessionsData)}>
          Consolelog sessionsData
        </button>
        <button onClick={() => console.log(aggregatedData)}>
          Consolelog aggregatedData
        </button> */}

        <div className="flex flex-row items-center pb-8">
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
                  icon={<DeleteIcon />}
                  // onClick={() => onClickExerciseStats(selectedExerciseId)}
                  // command="⌘T"
                >
                  Remove from dashboard
                </MenuItem>

                {/* <MenuItem
                // onClick={() => setShowConfirmDeleteSessionModal(true)}
                // onClick={handleClickEditExercise}
                icon={<EditIcon />}
              >
                Edit exercise
              </MenuItem> */}
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
