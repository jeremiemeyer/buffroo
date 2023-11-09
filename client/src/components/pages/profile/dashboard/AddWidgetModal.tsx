//@ts-nocheck
import { Button } from "@/components/ui/button"
import { Select } from "@chakra-ui/react"
import { useState } from "react"
import useExercises from "@/hooks/api/useExercises"
import useUserData from "@/hooks/api/useUserData"
import useToast from "@/hooks/useToast"
import useAuth from "@/hooks/useAuth"

export default function AddWidgetModal({ onClose }) {
  const [widgetToAddOptions, setWidgetToAddOptions] = useState({})
  const { exercisesData } = useExercises()
  const { preferencesSaved } = useToast()
  const { userData, updateUserData } = useUserData()
  const { auth } = useAuth()

  function getLastUsedPosition(array) {
    let lastUsedPosition = 0
    for (const index in array) {
      if (array[index].position > lastUsedPosition) {
        lastUsedPosition = array[index].position
      }
    }
    return lastUsedPosition
  }

  async function handleAddWidget() {
    const updatedUserData = {
      ...userData,
      dashboard: [
        ...userData.dashboard,
        { ...widgetToAddOptions,
        },
      ],
    }

    console.log(updatedUserData)

    const success = await updateUserData({userId: auth.userId, updatedUserData: updatedUserData})
    if (success === true) {
        onClose()
        preferencesSaved()
    }
  }

  return (
    <>
      <div
        onClick={onClose}
        className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-[900] relative bg-gray-50 text-slate-900  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 w-full md:w-[600px]"
        >
          <div className="h-[5%] flex flex-col justify-between items-center">
            <div className="justify-between w-full grid grid-cols-3 items-center text-center pb-12">
              <Button className="w-2" onClick={onClose} variant="destructive">
                X
              </Button>
              <h1 className="text-2xl">Add widget</h1>
              <div></div>
            </div>
            <div className="space-y-2 pb-8 w-full">
              {/* <button onClick={() => console.log(widgetToAddOptions)}>
                consolelog widgetToAddOptions
              </button> */}

              <div className="grid grid-cols-2 items-center">
                <span>Widget type</span>
                <div>
                  <Select
                    value={widgetToAddOptions.type}
                    placeholder="Select type"
                    _placeholderShown={widgetToAddOptions.type === undefined}
                    onChange={(e) =>
                      e.target.value === "workoutsPerWeek"
                        ? setWidgetToAddOptions({
                            type: e.target.value,
                          })
                        : setWidgetToAddOptions({
                            ...widgetToAddOptions,
                            type: e.target.value,
                            exerciseId: undefined,
                          })
                    }
                  >
                    <option value="workoutsPerWeek">Workouts per week</option>
                    <option value="exerciseBestSet">Best set</option>
                    <option value="exerciseVolume">Volume</option>
                  </Select>
                </div>
              </div>
              {(widgetToAddOptions.type === "exerciseVolume") |
              (widgetToAddOptions.type === "exerciseBestSet") ? (
                <div className="grid grid-cols-2 items-center">
                  <span>Exercise</span>
                  <div>
                    <Select
                      isDisabled={widgetToAddOptions.type === "workoutsPerWeek"}
                      placeholder="Select exercise"
                      _placeholderShown={widgetToAddOptions["exerciseId"]}
                      value={widgetToAddOptions.exerciseId}
                      onChange={(e) =>
                        setWidgetToAddOptions({
                          ...widgetToAddOptions,
                          exerciseId: e.target.value,
                        })
                      }
                    >
                      {exercisesData.map((exercise, index) => (
                        <option key={index} value={exercise._id}>
                          {exercise.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="grid grid-rows-2 gap-2">
              <Button onClick={handleAddWidget}>Add widget</Button>
              <Button onClick={onClose} variant="destructive">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
