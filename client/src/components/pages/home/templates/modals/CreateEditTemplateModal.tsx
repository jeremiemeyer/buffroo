//@ts-nocheck
import { useState } from "react"
import { Input } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { createPortal } from "react-dom"
import useAuth from "@/hooks/useAuth"
import ExerciseInTemplate from "../ExerciseInTemplate"
import ConfirmDiscardTemplateModal from "./ConfirmDiscardTemplateModal"
import ConfirmCancelEditTemplateModal from "./ConfirmCancelEditTemplateModal"
import AddExerciseToTemplateModal from "./AddExerciseToTemplateModal"
import useToast from "@/hooks/useToast"
import useTemplates from "@/hooks/api/useTemplates"
import useTheme from "@/hooks/useTheme"
import ModalTemplate from "@/components/ModalTemplate"

export default function CreateEditTemplateModal({
  actionType,
  onClose,
  templateData,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)
  const [showConfirmDiscardTemplate, setShowConfirmDiscardTemplate] =
    useState(false)
  const [showConfirmCancelEdit, setShowConfirmCancelEdit] = useState(false)
  const { auth } = useAuth()
  const { templateAdded, templateUpdated } =
    useToast()
  const { createUserTemplate, updateUserTemplate } = useTemplates()
  const { theme } = useTheme()

  const emptyTemplate = {
    name: "New template",
    startdate: "",
    enddate: "",
    exercises: [],
    notes: "",
  }

  // if edit mode, takes templateData from TemplateCard. If create mode, initialize with emptyTemplate
  const [thisTemplateData, setThisTemplateData] = useState(
    templateData ?? emptyTemplate
  )


  function handleEditTemplateNotes(e) {
    const newNotes = e.target.value
    setThisTemplateData({ ...thisTemplateData, notes: newNotes })
  }

  function handleEditTemplateName(e) {
    const newName = e.target.value
    setThisTemplateData({ ...thisTemplateData, name: newName })
  }


  const saveOrEditTemplate = async () => {
    if (actionType === "create") {
      const success = await createUserTemplate({
        userId: auth.userId,
        newTemplateData: thisTemplateData,
      })

      if (success === true) {
        onClose() // closes modal
        templateAdded() // toast
      }
    } else if (actionType === "edit") {
      const success = await updateUserTemplate({
        userId: auth.userId,
        templateId: thisTemplateData._id,
        updatedTemplateData: thisTemplateData,
      })

      if (success === true) {
        templateUpdated() // toast
        onClose() // closes modal
      }
    }
  }

  return (
    <>
      <div className="fixed z-[700] inset-0 bg-slate-700/75 bg-glassmorphism3 flex justify-center items-center">
        <div className="flex flex-col z-[900] relative bg-gray-50 dark:bg-black bg-glassmorphism2 dark:bg-opacity-50 dark:border-gray-700 text-slate-900 w-[100%] h-[95%] px-2 md:px-6 pb-4 rounded-2xl border border-slate-600 max-w-[1300px]">
          <div className="h-[5%] flex flex-row justify-between items-center gap-2 pt-12 px-2">
            <i className="fa fa-heading mr-4 dark:text-white dark:text-opacity-90" />
            <Input
              placeholder="Template title"
              variant="flushed"
              value={thisTemplateData && thisTemplateData.name}
              onChange={handleEditTemplateName}
              marginRight={"30px"}
              color={theme === "dark" ? "white" : ""}
            />
            <Button onClick={saveOrEditTemplate} variant="secondary">
              Save
            </Button>
          </div>

          <div className="grow mt-6 overflow-auto">

            <div className="space-y-2 mt-4 px-2 md:pb-4">
              <div className="flex flex-row items-center">
                <i className="fa fa-pen mr-4 dark:text-white dark:text-opacity-90" />
                <Input
                  placeholder="Notes"
                  variant="flushed"
                  value={thisTemplateData && thisTemplateData.notes}
                  onChange={(e) => handleEditTemplateNotes(e)}
                  marginRight={"30px"}
                  color={theme === "dark" ? "white" : ""}
                ></Input>
              </div>

              {/* Liste des exos */}
              <div className="h-1/2 overflow-auto space-y-3">
                {!isLoading &&
                  thisTemplateData &&
                  thisTemplateData.exercises.map((exercise, index) => (
                    <ExerciseInTemplate
                      key={index}
                      exercise={exercise}
                      templateData={thisTemplateData}
                      setTemplateData={setThisTemplateData}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-4 space-x-1 text-center">
            <Button onClick={() => setShowAddExerciseModal(true)}>
              Add Exercises
            </Button>
            <Button
              onClick={
                actionType === "create"
                  ? () => setShowConfirmDiscardTemplate(true)
                  : () => setShowConfirmCancelEdit(true)
              }
              variant="destructive"
            >
              {actionType === "create" ? "Discard template" : "Cancel edit"}
            </Button>
          </div>
        </div>
      </div>

      {showAddExerciseModal &&
        createPortal(
          <AddExerciseToTemplateModal
            onClose={() => setShowAddExerciseModal(false)}
            templateData={thisTemplateData}
            setTemplateData={setThisTemplateData}
          />,
          document.body
        )}

      {showConfirmDiscardTemplate &&
        createPortal(
          <ConfirmDiscardTemplateModal
            onClose={() => setShowConfirmDiscardTemplate(false)}
            onConfirmDiscardTemplate={onClose}
          />,
          document.body
        )}

      {showConfirmCancelEdit &&
        createPortal(
          <ConfirmCancelEditTemplateModal
            onConfirmCancelEdit={onClose}
            onClose={() => setShowConfirmCancelEdit(false)}
          />,
          document.body
        )}
    </>
  )
}
