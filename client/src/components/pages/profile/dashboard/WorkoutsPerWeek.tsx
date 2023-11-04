//@ts-nocheck
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
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
import EditWorkoutsPerWeekModal from "./editWorkoutsPerWeekModal"

const data = [
  {
    name: "11/9",
    total: 4,
  },
  {
    name: "18/9",
    total: 4,
  },
  {
    name: "25/9",
    total: 5,
  },
  {
    name: "2/10",
    total: 3,
  },
  {
    name: "9/10",
    total: 5,
  },
  {
    name: "16/10",
    total: 3,
  },
  {
    name: "23/10",
    total: 5,
  },
  {
    name: "30/10",
    total: 5,
  },
]

export default function WorkoutsPerWeek({
  userData,
  updateUserData,
}) {
  const [showEditWorkoutsPerWeekModal, setShowEditWorkoutsPerWeekModal] =
    useState(false)

  return (
    <>
      <div className="flex flex-col justify-center border border-gray-200 bg-white rounded-3xl p-6 max-w-[800px] mx-auto">
        <div className="flex flex-row items-center pb-8">
          <h1 className="font-semibold text-xl flex grow ">
            Workouts per week
          </h1>
          <h2 className="px-4 font-semibold">
            Current goal:{" "}
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
                backgroundColor="rgba(186,230,253,0.4)" //sky-200
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
                backgroundColor="rgba(186,230,253,0.4)" //sky-200
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
          <ResponsiveContainer width="99%" aspect={2}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={true}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={true}
                axisLine={true}
                tickFormatter={(value) => `${value}`}
              />
              <Bar
                dataKey="total"
                fill="rgb(37 99 235)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
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
