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
import { useState } from "react"
import { createPortal } from "react-dom"
import ConfirmDeleteTemplateModal from "./ConfirmDeleteTemplateModal"
import CreateEditTemplateModal from "./CreateEditTemplateModal"
import ConfirmStartWorkoutFromTemplateModal from "./ConfirmStartWorkoutFromTemplateModal"

export default function TemplateCard({
  templateData,
  getUserTemplates,
  startWorkoutFromTemplate,
}) {
  const [showConfirmDeleteTemplate, setShowConfirmDeleteTemplate] =
    useState(false)
  const [showEditTemplate, setShowEditTemplate] = useState(false)
  const [
    showConfirmStartWorkoutFromTemplateModal,
    setShowConfirmStartWorkoutFromTemplateModal,
  ] = useState(false)
  // start workout from template


  return (
    <>
      <div
        className="border border-gray-200 bg-white hover:bg-sky-50 hover:border-blue-200 rounded-3xl  mx-auto cursor-pointer"
        onClick={() => setShowConfirmStartWorkoutFromTemplateModal(true)}
      >
        <div className="p-4">
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-2xl font-semibold">{templateData.name}</h1>
            {/* <button onClick={() => console.log(templateData)}>Consolelog data</button> */}
            <div onClick={(e) => e.stopPropagation()}>
              <Menu variant="filled">
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<Icon as={FaEllipsisH} />}
                  textColor="rgba(14,165,233,1)" //sky-500
                  backgroundColor="rgba(186,230,253,0.4)" //sky-200
                  className="hover:bg-gray-200"
                />
                <MenuList zIndex={"600"}>
                  <MenuItem
                    icon={<EditIcon />}
                    onClick={() => setShowEditTemplate(true)}
                  >
                    Edit template
                  </MenuItem>

                  <MenuItem
                    icon={<DeleteIcon />}
                    onClick={() => setShowConfirmDeleteTemplate(true)}
                  >
                    Delete template
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
          <div>
            <ul>
              {templateData.exercises.map((exercise, index) => (
                <li key={index}>
                  {" "}
                  {exercise.sets.length} x {exercise.name}{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {showConfirmDeleteTemplate &&
        createPortal(
          <ConfirmDeleteTemplateModal
            onClose={() => setShowConfirmDeleteTemplate(false)}
            getUserTemplates={getUserTemplates}
            templateData={templateData}
          />,
          document.body
        )}
      {showEditTemplate &&
        createPortal(
          <CreateEditTemplateModal
            actionType="edit"
            thisTemplateData={templateData}
            getUserTemplates={getUserTemplates}
            onClose={() => setShowEditTemplate(false)}
          />,
          document.body
        )}
      {showConfirmStartWorkoutFromTemplateModal &&
        createPortal(
          <ConfirmStartWorkoutFromTemplateModal
            onClose={() => setShowConfirmStartWorkoutFromTemplateModal(false)}
            onConfirmStartWorkoutFromTemplate={() =>
              startWorkoutFromTemplate(templateData)
            }
            templateData={templateData}
          />,
          document.body
        )}
    </>
  )
}
