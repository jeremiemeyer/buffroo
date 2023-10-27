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
import { useState } from "react"
import { createPortal } from "react-dom"
import ConfirmDeleteTemplateModal from "./ConfirmDeleteTemplateModal"
import CreateEditTemplateModal from "./CreateEditTemplateModal"

export default function TemplateCard({
  templateData,
  deleteTemplate,
  getUserTemplates,
}) {
  const [showConfirmDeleteTemplate, setShowConfirmDeleteTemplate] =
    useState(false)
  const [showEditTemplate, setShowEditTemplate] = useState(false)

  return (
    <>
      <div className="border border-gray-200 bg-gray-200 hover:bg-gray-300 rounded-3xl max-w-xs mx-auto">
        <div className="p-4 ">
          <div className="flex justify-between items-center">
            <h1 className="text-xl pb-4">{templateData.name}</h1>
            {/* <button onClick={() => console.log(templateData)}>Consolelog data</button> */}
            <Menu variant="filled">
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="filled"
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
                  onClick={setShowConfirmDeleteTemplate}
                >
                  Delete template
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div>
            <ul>
              {templateData.exercises.map((exercise, index) => (
                <li key={index}> {exercise.name} </li>
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
