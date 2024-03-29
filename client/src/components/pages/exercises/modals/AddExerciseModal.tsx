//@ts-nocheck
import {
  Input,
  Select,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverContent,
  IconButton,
  Icon,
} from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import useAuth from "@/hooks/useAuth"
import useToast from "@/hooks/useToast"
import useExercises from "@/hooks/api/useExercises"
import useTheme from "@/hooks/useTheme"
import { PiQuestionFill } from "react-icons/pi"
import ModalTemplate from "@/components/ModalTemplate"

export default function AddExerciseModal({ onClose }: any) {
  const [nameInput, setNameInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedBodyPart, setSelectedBodyPart] = useState("")
  const { auth } = useAuth()
  const { exerciseAdded, someFieldsAreMissing } = useToast()
  const { addNewUserExercise } = useExercises()
  const { theme } = useTheme()

  function handleChange(e) {
    setNameInput(e.target.value)
  }

  function handleChangeCategory(e) {
    setSelectedCategory(e.target.value)
  }

  function handleChangeBodyPart(e) {
    setSelectedBodyPart(e.target.value)
  }

  async function handleSave() {
    const userId = auth.userId

    if (!nameInput | !selectedBodyPart | !selectedCategory) {
      return someFieldsAreMissing()
    }

    const newExerciseData = {
      name: nameInput,
      bodypart: selectedBodyPart,
      category: selectedCategory,
    }

    // console.log(newExerciseData)
    const success = await addNewUserExercise({
      userId: auth.userId,
      newExerciseData: newExerciseData,
    })
    if (success) {
      onClose()

      exerciseAdded() // toast notification
    }
  }

  return (
    <ModalTemplate onClose={onClose}>
      <div className="flex flex-row justify-between items-center text-center">
        <Button onClick={onClose} variant="destructive">
          X
        </Button>
        <h1 className="text-2xl text-center dark:text-white dark:text-opacity-90">
          Create New Exercise
        </h1>
        <Button onClick={handleSave}>Save</Button>
      </div>

      <div className="space-y-2 mt-4">
        <div className="flex flex-row items-center">
          <i className="fa fa-heading mr-4 dark:text-white dark:text-opacity-90" />
          <Input
            placeholder="Exercise name"
            variant="flushed"
            value={nameInput}
            onChange={(e) => handleChange(e)}
            color={theme === "dark" ? "white" : ""}
          ></Input>
        </div>

        <div className="grid grid-cols-2 justify-between items-center">
          <p className="dark:text-white dark:text-opacity-90">Body part</p>
          <Select
            placeholder="Select option"
            onChange={(e) => handleChangeBodyPart(e)}
            className=" dark:bg-gray-600 dark:border-gray-600"
            color={theme === "dark" ? "white" : ""}
          >
            <option value="core">Core</option>
            <option value="arms">Arms</option>
            <option value="back">Back</option>
            <option value="chest">Chest</option>
            <option value="legs">Legs</option>
            <option value="shoulders">Shoulders</option>
            <option value="cardio">Cardio</option>
            <option value="other">Other</option>
          </Select>
        </div>

        <div className="grid grid-cols-2 justify-between items-center">
          <div className="flex flex-row items-center">
            <p className="dark:text-white dark:text-opacity-90">Category</p>
            <Popover>
              <PopoverTrigger>
                <IconButton
                  isRound="true"
                  colorScheme="gray"
                  variant=""
                  aria-label="Search database"
                  icon={<Icon as={PiQuestionFill} />}
                  className="hover:bg-gray-100 ml-1 text-gray-400 dark:hover:bg-gray-700"
                />
              </PopoverTrigger>
              <PopoverContent
                bgColor={theme === "dark" ? "#1e293b" : ""}
                color={theme === "dark" ? "white" : ""}
                borderColor={theme === "dark" ? "#374151" : "#d1d5db"}
              >
                <PopoverArrow bgColor={theme === "dark" ? "#1e293b" : ""} />
                <PopoverCloseButton />
                <PopoverHeader
                  borderColor={theme === "dark" ? "#374151" : "#d1d5db"}
                >
                  Info
                </PopoverHeader>
                <PopoverBody>
                  Assisted bodyweight exercises will register a negative value
                  weight.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>

          <Select
            placeholder="Select option"
            onChange={(e) => handleChangeCategory(e)}
            className=" dark:bg-gray-600 dark:border-gray-600"
            color={theme === "dark" ? "white" : ""}
          >
            <option value="barbell">Barbell</option>
            <option value="dumbbell">Dumbbell</option>
            <option value="machine">Machine</option>
            <option value="weighted-bodyweight">Weighted Bodyweight</option>
            <option value="assisted-bodyweight">Assisted Bodyweight</option>
          </Select>
        </div>
      </div>
    </ModalTemplate>
  )
}
