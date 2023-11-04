//@ts-nocheck
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
import useToast from "@/hooks/useToast"

export default function ExerciseCard({
  name,
  bodypart,
  category,
  onClickExerciseEdit,
  onClickExerciseStats,
  isSelected,
  exerciseId,
  selectedExerciseId,
  setSelectedExerciseId,
  isCustomUserExercise,
  index,
}) {
  const { noEditDefaultExercises } = useToast()

  function handleClickEditExercise() {
    isCustomUserExercise
      ? onClickExerciseEdit(selectedExerciseId)
      : noEditDefaultExercises()
  }

  // formats category and bodypart fields correctly for the frontend
  function formatString(category) {
    const words = category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    return words.join(" ")
  }

  return (
    <div
      // onClick={() => onClickExerciseCard(exerciseId)}
      className={`${
        isSelected ? "bg-gray-200" : "hover:bg-sky-50 hover:border-blue-200"
      } border bg-white border-gray-200 rounded-2xl text-left mt-2 mx-auto p-4 flex flex-row items-center`}
      key={index}
    >
      <div className="text-4xl mr-8 w-8">{name.charAt(0)}</div>

      <div className="flex-col grow">
        <p className="text-xl font-semibold">{name}</p>
        <p>
          <span className="text-gray-500">Body part:</span> {String(bodypart)}
        </p>
        <p>
          <span className="text-gray-500">Category:</span>{" "}
          {formatString(category)}
        </p>
      </div>
      <div>
        {" "}
        <Menu variant="filled">
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<Icon as={FaEllipsisH} />}
            textColor="rgba(14,165,233,1)" //sky-500
            backgroundColor="rgba(186,230,253,0.4)" //sky-200
            onClick={() => setSelectedExerciseId(exerciseId)}
            className="hover:bg-gray-200"
          />
          <MenuList zIndex={"600"}>
            <MenuItem
              icon={<RepeatClockIcon />}
              onClick={() => onClickExerciseStats(selectedExerciseId)}
              // command="⌘T"
            >
              See exercise stats
            </MenuItem>

            <MenuItem
              // onClick={() => setShowConfirmDeleteSessionModal(true)}
              onClick={handleClickEditExercise}
              icon={<EditIcon />}
            >
              Edit exercise
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  )
}
