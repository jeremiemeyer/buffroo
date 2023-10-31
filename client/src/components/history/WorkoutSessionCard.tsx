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

export default function WorkoutSessionCard({
  sessionData,
  deleteWorkoutSession,
  onClick,
}) {
  const [showConfirmDeleteSessionModal, setShowConfirmDeleteSessionModal] =
    useState(false)

  function deleteSession() {
    deleteWorkoutSession(sessionData._id)
  }

  return (
    <>
      <div
        className={`border border-gray-200 bg-gray-200 hover:bg-gray-300 rounded-xl text-left mt-2`}
      >
        <div className="p-6">
          <div className="flex flex-row justify-between items-center">
            <span className="font-light text-2xl pb-2">
              {sessionData?.name}
            </span>
            <Menu variant="filled">
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<Icon as={FaEllipsisH} />}
                variant="filled"
                className="hover:bg-gray-200"
              />
              <MenuList>
                <MenuItem
                  icon={<EditIcon />}
                  onClick={onClick}
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
            <i className="fa-regular fa-calendar mr-4" />
            {formatISODate(sessionData?.startdate)}
          </p>

          <i className="fa-solid fa-clock mr-4" />
          {calculateWorkoutDuration(
            sessionData?.startdate,
            sessionData?.enddate
          )}
          {sessionData?.notes !== "" && (
            <p>
              <i className="fa fa-pen mr-4" />{" "}
              <span className="font-light italic">“{sessionData?.notes}”</span>
            </p>
          )}

          <div className="grid grid-cols-2 pt-4">
            <div className="text-gray-500">Exercise</div>
            <div className="text-gray-500">Best set</div>
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
      </div>
      {showConfirmDeleteSessionModal &&
        createPortal(
          <ConfirmDeleteSessionModal
            deleteSession={deleteSession}
            onClose={() => setShowConfirmDeleteSessionModal(false)}
          />,
          document.body
        )}
    </>
  )
}
