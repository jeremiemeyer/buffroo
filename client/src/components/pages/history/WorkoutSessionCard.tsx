//@ts-nocheck
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Icon,
} from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import { FaEllipsisH } from "react-icons/fa"
import { useState } from "react"
import { createPortal } from "react-dom"
import ConfirmDeleteSessionModal from "./modals/ConfirmDeleteSessionModal"
import formatISODate from "@/utils/formatISODate"
import calculateWorkoutDuration from "@/utils/calculateWorkoutDuration"
import calculateBestSet from "@/utils/calculateBestSet"
import EditWorkoutModal from "./modals/EditWorkoutModal"
import SquircleTile from "@/components/ui/squircle-tile"

export default function WorkoutSessionCard({ sessionData }) {
  const [showConfirmDeleteSessionModal, setShowConfirmDeleteSessionModal] =
    useState(false)
  const [showEditWorkoutModal, setShowEditWorkoutModal] = useState(false)

  return (
    <>
      <div className="relative">
        <Menu variant="filled">
          <div className="absolute top-5 right-4 mr-2 z-[1]">
            <MenuButton
              as={IconButton}
              aria-label="Options"
              textColor="rgba(14,165,233,1)" //sky-500
              bg={"rgba(186,230,253,0.4)"}
              _hover={{ bg: "rgba(186,230,253,0.8)" }}
              icon={<Icon as={FaEllipsisH} />}
              className="hover:bg-sky-800"
            />
          </div>
          <MenuList>
            <MenuItem
              icon={<EditIcon />}
              onClick={() => setShowEditWorkoutModal(true)}
              // command="⌘T"
            >
              Edit session
            </MenuItem>

            <MenuItem
              onClick={() => setShowConfirmDeleteSessionModal(true)}
              icon={<DeleteIcon />}
            >
              Delete from history
            </MenuItem>
          </MenuList>
        </Menu>
        <SquircleTile>
          {/* <button onClick={() => console.log(sessionData)}>Consolelog this session's data</button> */}
          <div className="flex flex-row justify-between items-center">
            <span className="dark:text-white dark:text-opacity-90 font-semibold text-2xl pb-2 truncate ...">
              {sessionData?.name}
            </span>
          </div>
          <p className="dark:text-white dark:text-opacity-90">
            <span className="mr-4">📆</span>
            {/* <i className="fa-regular fa-calendar mr-4" /> */}
            {formatISODate(sessionData?.startdate)}
          </p>

          {/* <i className="fa-solid fa-clock mr-4" /> */}
          <p className="dark:text-white dark:text-opacity-90">
            <span className="mr-4">🕓</span>
            {calculateWorkoutDuration(
              sessionData?.startdate,
              sessionData?.enddate
            )}
          </p>

          {sessionData?.notes !== "" && (
            <p>
              <span className="mr-4">📝</span>
              {/* <i className="fa fa-pen mr-4" />{" "} */}
              <span className="text-gray-400 dark:text-white dark:text-opacity-70 italic">
                “{sessionData?.notes}”
              </span>
            </p>
          )}

          <div className="grid grid-cols-6 pt-4">
            <div className="font-semibold col-span-4 dark:text-white dark:text-opacity-70">
              Exercise
            </div>
            <div className="font-semibold col-span-2 dark:text-white dark:text-opacity-70">
              Best set
            </div>
          </div>
          {sessionData?.exercises.map((exercise, key) => (
            <div className="grid grid-cols-6" key={key}>
              <div className="col-span-4 pr-4 truncate ... dark:text-white dark:text-opacity-90">
                {exercise.sets.length} x {exercise.name}
              </div>
              <div className="col-span-2 truncate ... dark:text-white dark:text-opacity-90">
                {calculateBestSet(exercise.sets)}
              </div>
            </div>
          ))}
          {/* <button onClick={() => console.log(sessionData._id)}>ID</button> */}
        </SquircleTile>
      </div>

      {showConfirmDeleteSessionModal &&
        createPortal(
          <ConfirmDeleteSessionModal
            onClose={() => setShowConfirmDeleteSessionModal(false)}
            sessionData={sessionData}
          />,
          document.body
        )}
      {showEditWorkoutModal &&
        createPortal(
          <EditWorkoutModal
            thisWorkoutData={sessionData}
            onClose={() => setShowEditWorkoutModal(false)}
          />,
          document.body
        )}
    </>
  )
}
