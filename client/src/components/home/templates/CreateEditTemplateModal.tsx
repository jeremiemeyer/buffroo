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

export default function CreateEditTemplateModal({
  actionType,
  onClose,
  templateId, // for edit mode
  getUserTemplates, // for edit mode
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)
  const [showConfirmDiscardTemplate, setShowConfirmDiscardTemplate] =
    useState(false)
  const [showConfirmCancelEdit, setShowConfirmCancelEdit] = useState(false)
  const { auth } = useAuth()
  const { cannotSubmitEmptyTemplate, templateAdded, templateUpdated } = useToast()

  const {
    templateData,
    setTemplateData,
    handleEditTemplateNotes,
    handleEditTemplateName,
    addExercise,
    resetTemplate,
  } = useTemplateData()


  const axiosPrivate = useAxiosPrivate()

  const TEMPLATES_URL = `/api/users/${auth.userId}/templates`
  const TEMPLATE_URL = `/api/users/${auth.userId}/templates/${templateId}`


  // create template (for create mode)
  const saveOrEditTemplate = async () => {
    if (actionType === "create") {
      if (templateData.exercises.length === 0) {
        return cannotSubmitEmptyTemplate()
      }

      const dataToSend = {
        ...templateData,
      }

      console.log("data sent: ", dataToSend)
      console.log("user id", auth.userId)

      try {
        await axiosPrivate.post(TEMPLATES_URL, dataToSend)
        getUserTemplates()
        onClose()
        templateAdded()
      } catch (error) {
        return console.log("error")
      }
    } else if (actionType === "edit") {
      try {
        const response = await axiosPrivate.put(TEMPLATE_URL, templateData)
        const updatedTemplateData = response.data
        // console.log(updatedSessionData)
        getUserTemplates()
        templateUpdated()
        onClose()
      } catch (error) {
        console.error("Error updating template:", error)
        // navigate("/login", { state: { from: location }, replace: true })
      }
    }
  }

  // get template info (for edit mode)
  const getTemplateData = async () => {
    try {
      const response = await axiosPrivate.get(TEMPLATE_URL)
      console.log(response.data)
      const templateData = response.data
      console.log(templateData)
      setTemplateData(templateData)
    } catch (error) {
      console.error("Error fetching template data:", error)
      // navigate("/login", { state: { from: location }, replace: true })
    }
  }

  useEffect(() => {
    if (actionType === "edit") {
      getTemplateData()
    }
  }, [])

  return (
    <>
      <div className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center">
        <div className="flex flex-col z-[900] relative bg-gray-100 text-slate-900 w-[100%] h-[95%] px-6  pb-6 rounded-2xl border border-slate-600 max-w-[1300px]">
          <div className="h-[5%] flex flex-row justify-between items-center gap-2 pt-12">
            <i className="fa fa-heading mr-4" />
            <Input
              placeholder="Template title"
              variant="flushed"
              value={templateData.name}
              onChange={handleEditTemplateName}
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

      {/* {showConfirmDiscardChangesModal &&
        createPortal(
          <ConfirmDiscardChangesModal
            onClose={() => setShowConfirmDiscardChangesModal(false)}
            onCancelEditWorkout={onClose}
          />,
          document.body
        )} */}
    </>
  )
}
