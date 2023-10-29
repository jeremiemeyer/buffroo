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

export default function TemplateCard({
  templateData,
  deleteTemplate,
  getUserTemplates,
  startWorkoutFromTemplate,
}) {
  const [showConfirmDeleteTemplate, setShowConfirmDeleteTemplate] =
    useState(false)
  const [showEditTemplate, setShowEditTemplate] = useState(false)

  // start workout from template

  return (
    <>
      <div
        className="border border-gray-200 bg-gray-200 hover:bg-gray-300 rounded-3xl  mx-auto cursor-pointer"
        onClick={() => startWorkoutFromTemplate(templateData)}
      >
        <div className="p-4">
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-2xl font-light">{templateData.name}</h1>
            {/* <button onClick={() => console.log(templateData)}>Consolelog data</button> */}
            <div onClick={(e) => e.stopPropagation()}>
              <Menu variant="filled">
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<Icon as={FaEllipsisH} />}
                  variant="filled"
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
            onConfirmDeleteTemplate={() => deleteTemplate(templateData._id)}
            getUserTemplates={getUserTemplates}
          />,
          document.body
        )}
      {showEditTemplate &&
        createPortal(
          <CreateEditTemplateModal
            actionType="edit"
            templateId={templateData._id}
            getUserTemplates={getUserTemplates}
            onClose={() => setShowEditTemplate(false)}
          />,
          document.body
        )}
    </>
  )
}
