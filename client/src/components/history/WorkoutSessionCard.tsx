// @ts-nocheck
import {
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
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
import { useState } from "react"
import { createPortal } from "react-dom"
import ConfirmDeleteSessionModal from "./ConfirmDeleteSessionModal"

export default function WorkoutSessionCard({
  sessionData,
  deleteWorkoutSession,
  onClick,
}) {
  const [showConfirmDeleteSessionModal, setShowConfirmDeleteSessionModal] =
    useState(false)
  function formatISODate(isoDate) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }

    const formattedDate = new Date(isoDate).toLocaleString("en-US", options)
    return formattedDate
  }

  function calculateWorkoutDuration(startISODate, endISODate) {
    const startDate = new Date(startISODate)
    const endDate = new Date(endISODate)
    const durationInMilliseconds = endDate - startDate

    const hours = Math.floor(durationInMilliseconds / 3600000)
    const minutes = Math.floor((durationInMilliseconds % 3600000) / 60000)

    let formattedDuration = ""

    if (hours > 0) {
      formattedDuration += `${hours}h`
    }

    if (minutes > 0 || formattedDuration === "") {
      formattedDuration += ` ${minutes}m`
    } else if (formattedDuration === "") {
      formattedDuration = "0m"
    }

    return formattedDuration.trim()
  }

  function deleteSession() {
    deleteWorkoutSession(sessionData._id)
  }

  function getBestSet(exerciseSets) {
    if (!Array.isArray(exerciseSets) || exerciseSets.length === 0) {
      return "No data available"; // Return this message if exerciseSets is not an array or is empty
    }
  
    let bestSet = exerciseSets[0]; // Initialize bestSet with the first set
    let maxProduct = bestSet.reps * bestSet.weight;
  
    for (let i = 1; i < exerciseSets.length; i++) {
      const currentSet = exerciseSets[i];
      const product = currentSet.reps * currentSet.weight;
  
      if (product > maxProduct) {
        bestSet = currentSet;
        maxProduct = product;
      }
    }
  
    return `${bestSet.reps} x ${bestSet.weight} kg`;
  }

  return (
    <>
      <div
        className={`border border-gray-200 bg-gray-200 hover:bg-gray-300 rounded-xl text-left mt-2`}
      >
        <div className="p-6">
          <div className="flex flex-row justify-between items-center">
            <span className="font-light text-2xl pb-2">{sessionData?.name}</span>
            <Menu variant="filled">
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="filled"
              />
              <MenuList>
                <MenuItem
                  icon={<EditIcon />}
                  onClick={onClick}
                  // command="⌘T"
                >
                  Edit session
                </MenuItem>

                <MenuItem onClick={() => setShowConfirmDeleteSessionModal(true)} icon={<DeleteIcon />}>
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
              <i className="fa fa-pen mr-4" /> <span className="font-light">“{sessionData?.notes}”</span>
            </p>
          )}

          <div className="grid grid-cols-2 pt-4">
            <div className="text-gray-500" >Exercise</div>
            <div className="text-gray-500" >Best set</div>
          </div>
          {sessionData?.exercises.map((exercise, key) => (
            <div className="grid grid-cols-2" key={key}>
              <div>
                {exercise.sets.length} x {exercise.name}
              </div>
              <div>
                {getBestSet(exercise.sets)}
              </div>
            </div>
          ))}
        </div>
      </div>
      { showConfirmDeleteSessionModal && createPortal(<ConfirmDeleteSessionModal deleteSession={deleteSession} onClose={() => setShowConfirmDeleteSessionModal(false)}/>, document.body)}
    </>
  )
}
