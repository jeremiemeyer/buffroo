//@ts-nocheck
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
} from "@chakra-ui/react"
import {
  HamburgerIcon,
  DeleteIcon,
  ArrowDownIcon,
  EditIcon,
  RepeatClockIcon,
} from "@chakra-ui/icons"
//@ts-nocheck
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
}) {
  function handleClickEditExercise() {
    isCustomUserExercise
      ? onClickExerciseEdit(selectedExerciseId)
      : alert("You can't edit default exercises.")
  }


  // formats category and bodypart fields correctly for the frontend
  function formatString(category) {
    const words = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
  }

  return (
    <div
      // onClick={() => onClickExerciseCard(exerciseId)}
      className={`${
        isSelected ? "bg-gray-400" : "hover:bg-gray-300 "
      } border border-gray-200 bg-gray-200 rounded-2xl text-left mt-2 mx-auto p-4 flex flex-row items-center`}
    >
      <div className="text-4xl mr-8 w-8">{name.charAt(0)}</div>

      <div className="flex-col grow">
        <p className="font-semibold">{name}</p>
        <p>
          <span className="text-gray-500">Body part:</span> {formatString(bodypart)}
        </p>
        <p>
          <span className="text-gray-500">Category:</span> {formatString(category)}
        </p>
      </div>
      <div>
        {" "}
        <Menu variant="filled">
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="filled"
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
