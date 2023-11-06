// @ts-nocheck
import {
  Input,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Icon,
} from "@chakra-ui/react"
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  DeleteIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@chakra-ui/icons"
import { FaEllipsisH } from "react-icons/fa"
import { useState } from "react"
import { createPortal } from "react-dom"
import ConfirmDeleteSessionModal from "./ConfirmDeleteSessionModal"
import formatISODate from "@/utils/formatISODate"
import calculateWorkoutDuration from "@/utils/calculateWorkoutDuration"
import calculateBestSet from "@/utils/calculateBestSet"
import useAuth from "@/hooks/useAuth"
import useToast from "@/hooks/useToast"
import EditWorkoutModal from "./EditWorkoutModal"

export default function WorkoutSessionCard({
  sessionData,
  onClick,
  getUserSessions,
}) {
  const [showConfirmDeleteSessionModal, setShowConfirmDeleteSessionModal] =
    useState(false)
  const [showEditWorkoutModal, setShowEditWorkoutModal] = useState(false)

  const { auth } = useAuth()
  const { workoutDeleted } = useToast()

  return (
    <>
      <div
        className={`border border-gray-200 bg-white rounded-3xl text-left mt-2`}
      >
        <div className="p-6">
          {/* <button onClick={() => console.log(sessionData)}>Consolelog this session's data</button> */}
          <div className="flex flex-row justify-between items-center">
            <span className="font-semibold text-2xl pb-2">
              {sessionData?.name}
            </span>
            <Menu variant="filled">
              <MenuButton
                as={IconButton}
                aria-label="Options"
                textColor="rgba(14,165,233,1)" //sky-500
                bg={"rgba(186,230,253,0.4)"}
                _hover={{ bg: "rgba(186,230,253,0.8)" }}
                icon={<Icon as={FaEllipsisH} />}
                className="hover:bg-sky-800"
              />
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
          </div>
          <p>
            <span className="mr-4">📆</span>
            {/* <i className="fa-regular fa-calendar mr-4" /> */}
            {formatISODate(sessionData?.startdate)}
          </p>

          {/* <i className="fa-solid fa-clock mr-4" /> */}
          <span className="mr-4">🕓</span>
          {calculateWorkoutDuration(
            sessionData?.startdate,
            sessionData?.enddate
          )}
          {sessionData?.notes !== "" && (
            <p>
              <span className="mr-4">📝</span>
              {/* <i className="fa fa-pen mr-4" />{" "} */}
              <span className="text-gray-400 italic">
                “{sessionData?.notes}”
              </span>
            </p>
          )}

          <div className="grid grid-cols-2 pt-4">
            <div className="font-semibold">Exercise</div>
            <div className="font-semibold">Best set</div>
          </div>
          {sessionData?.exercises.map((exercise, key) => (
            <div className="grid grid-cols-2" key={key}>
              <div>
                {exercise.sets.length} x {exercise.name}
              </div>
              <div>{calculateBestSet(exercise.sets)}</div>
            </div>
          ))}
        </div>
        {/* <button onClick={() => console.log(sessionData._id)}>ID</button> */}
      </div>
      {showConfirmDeleteSessionModal &&
        createPortal(
          <ConfirmDeleteSessionModal
            onClose={() => setShowConfirmDeleteSessionModal(false)}
            sessionData={sessionData}
            getUserSessions={getUserSessions}
          />,
          document.body
        )}
      {showEditWorkoutModal &&
        createPortal(
          <EditWorkoutModal
            thisWorkoutData={sessionData}
            onClose={() => setShowEditWorkoutModal(false)}
            getUserSessions={getUserSessions}
          />,
          document.body
        )}
    </>
  )
}
