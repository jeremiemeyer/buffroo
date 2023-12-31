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
        isSelected ? "bg-gray-200" : ""
      } border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-3xl text-left mt-2 mx-auto p-4 flex flex-row items-center`}
      key={index}
    >
      <div className="text-4xl mr-8 w-6 dark:text-white dark:text-opacity-90">{name.charAt(0)}</div>

      <div className="flex-col grow">
        <p className="text-xl font-semibold dark:text-white dark:text-opacity-90">{name}</p>
        <p>
          <span className="text-gray-500 dark:text-white dark:text-opacity-70">Body part:</span> <span className="dark:text-white dark:text-opacity-90">{formatString(bodypart)}</span>
        </p>
        <p>
          <span className="text-gray-500 dark:text-white dark:text-opacity-70">Category:</span>{" "}<span className="dark:text-white dark:text-opacity-90">
          {formatString(category)}</span>
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
            bg={"rgba(186,230,253,0.4)"}
            _hover={{ bg: "rgba(186,230,253,0.8)"}}
            onClick={() => setSelectedExerciseId(exerciseId)}
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
