//@ts-nocheck
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Icon,
} from "@chakra-ui/react"
import { EditIcon, RepeatClockIcon } from "@chakra-ui/icons"
import { FaEllipsisH } from "react-icons/fa"
import useToast from "@/hooks/useToast"
import SquircleTile from "@/components/ui/squircle-tile"

export default function ExerciseCard({
  name,
  bodypart,
  category,
  onClickExerciseEdit,
  onClickExerciseStats,
  exerciseId,
  selectedExerciseId,
  setSelectedExerciseId,
  isCustomUserExercise,
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
    <div className="relative">
      {/* Menu */}
        <Menu variant="filled" >
          <div className="absolute top-1/2 -translate-y-1/2 right-4 mr-2 z-[1]">
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<Icon as={FaEllipsisH} />}
              textColor="rgba(14,165,233,1)" //sky-500
              bg={"rgba(186,230,253,0.4)"}
              _hover={{ bg: "rgba(186,230,253,0.8)" }}
              onClick={() => setSelectedExerciseId(exerciseId)}
            />
          </div>

          <div className="absolute z-[50]">
            <MenuList>
              <MenuItem
                icon={<RepeatClockIcon />}
                onClick={() => onClickExerciseStats(selectedExerciseId)}
              >
                See exercise stats
              </MenuItem>
              <MenuItem onClick={handleClickEditExercise} icon={<EditIcon />}>
                Edit exercise
              </MenuItem>
            </MenuList>
          </div>
        </Menu>

      {/* Squircle */}
      <SquircleTile>
        <div
          // onClick={() => onClickExerciseCard(exerciseId)}
          className={`text-left mx-auto flex flex-row items-center`}
        >
          <div className="text-4xl mr-8 w-6 dark:text-white dark:text-opacity-90">
            {name.charAt(0)}
          </div>

          <div className="flex-col grow">
            <p className="text-xl font-semibold dark:text-white dark:text-opacity-90">
              {name}
            </p>
            <p>
              <span className="text-gray-500 dark:text-white dark:text-opacity-70">
                Body part:
              </span>{" "}
              <span className="dark:text-white dark:text-opacity-90">
                {formatString(bodypart)}
              </span>
            </p>
            <p>
              <span className="text-gray-500 dark:text-white dark:text-opacity-70">
                Category:
              </span>{" "}
              <span className="dark:text-white dark:text-opacity-90">
                {formatString(category)}
              </span>
            </p>
          </div>
        </div>
      </SquircleTile>
    </div>
  )
}
