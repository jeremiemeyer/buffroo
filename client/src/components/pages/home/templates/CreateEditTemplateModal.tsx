//@ts-nocheck
import { useState, useEffect } from "react"
import {
  Input,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
} from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { ArrowDownIcon, ArrowUpIcon, HamburgerIcon } from "@chakra-ui/icons"
import { createPortal } from "react-dom"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"

import ExerciseInTemplate from "./ExerciseInTemplate"
import AddExerciseToWorkoutModal from "../../workout/AddExerciseToWorkoutModal"
import ConfirmDiscardTemplateModal from "./ConfirmDiscardTemplateModal"
import ConfirmCancelEditTemplateModal from "./ConfirmCancelEditTemplateModal"
import AddExerciseToTemplateModal from "./AddExerciseToTemplateModal"
import useTemplateData from "@/hooks/useTemplateData"
import useToast from "@/hooks/useToast"
import useTemplates from "@/hooks/api/useTemplates"

export default function CreateEditTemplateModal({
  actionType,
  onClose,
  thisTemplateData,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)
  const [showConfirmDiscardTemplate, setShowConfirmDiscardTemplate] =
    useState(false)
  const [showConfirmCancelEdit, setShowConfirmCancelEdit] = useState(false)
  const { auth } = useAuth()
  const { cannotSubmitEmptyTemplate, templateAdded, templateUpdated } =
    useToast()
  const { createUserTemplate, updateUserTemplate } = useTemplates()

  const {
    templateData,
    setTemplateData,
    handleEditTemplateNotes,
    handleEditTemplateName,
    addExercise,
    resetTemplate,
  } = useTemplateData()

  const axiosPrivate = useAxiosPrivate()


  useEffect(() => {
    setTemplateData(thisTemplateData)
  }, [])

  // create template (for create mode)
  const saveOrEditTemplate = async () => {
    if (actionType === "create") {
      const success = await createUserTemplate({
        userId: auth.userId,
        newTemplateData: templateData,
      })

      if (success === true) {
        onClose() // closes modal
        templateAdded() // toast
      }
    } else if (actionType === "edit") {
      const success = await updateUserTemplate({
        userId: auth.userId,
        templateId: templateData._id,
        updatedTemplateData: templateData
      })

      if (success === true) {
        templateUpdated() // toast
        onClose() // closes modal
      }
    }
  }

  return (
    <>
      <div className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center">
        <div className="flex flex-col z-[900] relative bg-gray-50 text-slate-900 w-[100%] h-[95%] px-6  pb-6 rounded-2xl border border-slate-600 max-w-[1300px]">
          <div className="h-[5%] flex flex-row justify-between items-center gap-2 pt-12">
            <i className="fa fa-heading mr-4" />
            <Input
              placeholder="Template title"
              variant="flushed"
              value={templateData.name}
              onChange={handleEditTemplateName}
              marginRight={"30px"}
            />
            <Button onClick={saveOrEditTemplate} variant="secondary">
              Save
            </Button>
          </div>

          <div className="grow mt-6 overflow-auto">
            {/* <button onClick={() => console.log(templateToEditId)}>
              Template to edit ID
            </button> */}

            <div className="space-y-2 mt-4">
              <div className="flex flex-row items-center">
                <i className="fa fa-pen mr-4" />
                <Input
                  placeholder="Notes"
                  variant="flushed"
                  value={templateData.notes}
                  onChange={(e) => handleEditTemplateNotes(e)}
                  marginRight={"30px"}
                ></Input>
              </div>

              {/* Liste des exos */}
              <div className="h-1/2 overflow-auto space-y-3">
                {!isLoading &&
                  templateData.exercises.length > 0 &&
                  templateData.exercises.map((exercise, index) => (
                    <ExerciseInTemplate
                      key={index}
                      exercise={exercise}
                      templateData={templateData}
                      setTemplateData={setTemplateData}
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
          {/* <button onClick={() => console.log(templateData)}>
            consolelog template data
          </button>
          <button onClick={() => console.log(auth.userId)}>
            consolelog userid
          </button> */}
        </div>
      </div>

      {showAddExerciseModal &&
        createPortal(
          <AddExerciseToTemplateModal
            onClose={() => setShowAddExerciseModal(false)}
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
