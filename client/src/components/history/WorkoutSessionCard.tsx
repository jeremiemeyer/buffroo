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

export default function WorkoutSessionCard({
  sessionData,
  deleteWorkoutSession,
  onClick,
}) {
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

  return (
    <div
      onClick={onClick}
      className={`border border-gray-200 bg-gray-200 hover:bg-gray-300 rounded-xl text-left mt-2 cursor-pointer`}
    >
      <div className="p-6">
        <div className="flex flex-row justify-between items-center">
          <span className="font-bold pb-2 text-xl">{sessionData?.name}</span>
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
                // command="⌘T"
              >
                Edit session
              </MenuItem>

              <MenuItem onClick={deleteSession} icon={<DeleteIcon />}>
                Delete from history
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <p className="font-semibold">
          <i className="fa-regular fa-calendar mr-4" />
          {formatISODate(sessionData?.startdate)}
        </p>

        <i className="fa-solid fa-clock mr-4" />
        {calculateWorkoutDuration(sessionData?.startdate, sessionData?.enddate)}
        {sessionData?.notes !== "" && (
          <p>
            <i className="fa fa-pen mr-4" /> {sessionData?.notes}
          </p>
        )}

        <div className="grid grid-cols-2 pt-4">
          <div className="font-semibold">Exercise</div>
          <div className="font-semibold">Sets</div>
        </div>
        {sessionData?.exercises.map((exercise, key) => (
          <div className="grid grid-cols-2" key={key}>
            <div>
              {exercise.sets.length} x {exercise.name}
            </div>
            <div>
              {exercise.sets.map((set, setIndex) => (
                <span key={setIndex}>
                  {set.reps}x{set.weight}kg
                  {setIndex < exercise.sets.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
