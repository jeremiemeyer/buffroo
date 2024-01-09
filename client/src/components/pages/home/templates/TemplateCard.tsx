//@ts-nocheck
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Icon,
} from "@chakra-ui/react"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { FaEllipsisH } from "react-icons/fa"
import { useState } from "react"
import { createPortal } from "react-dom"
import ConfirmDeleteTemplateModal from "./modals/ConfirmDeleteTemplateModal"
import CreateEditTemplateModal from "./modals/CreateEditTemplateModal"
import ConfirmStartWorkoutFromTemplateModal from "./modals/ConfirmStartWorkoutFromTemplateModal"
import SquircleTile from "@/components/ui/squircle-tile"

export default function TemplateCard({
  templateData,
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
      <div className="relative">
        <Menu variant="filled">
          <div className="absolute top-4 right-3 mr-2 z-[1]">
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<Icon as={FaEllipsisH} />}
              textColor="rgba(14,165,233,1)" //sky-500
              bg={"rgba(186,230,253,0.4)"}
              _hover={{ bg: "rgba(186,230,253,0.8)" }}
              className="hover:bg-gray-200"
            />
          </div>
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
        <SquircleTile
          onClickAction={() =>
            setShowConfirmStartWorkoutFromTemplateModal(true)
          }
        >
          <div className="flex justify-between items-center pb-4">
            <h1 className="dark:text-white dark:text-opacity-90 text-xl max-w-[70%] md:text-2xl font-semibold truncate ...">
              {templateData.name}
            </h1>
          </div>
          <div>
            <ul className="dark:text-white dark:text-opacity-70">
              {templateData.exercises.map((exercise, index) => (
                <li key={index}>
                  {exercise.sets.length} x {exercise.name}{" "}
                </li>
              ))}
            </ul>
          </div>
        </SquircleTile>
      </div>

      {showConfirmDeleteTemplate &&
        createPortal(
          <ConfirmDeleteTemplateModal
            onClose={() => setShowConfirmDeleteTemplate(false)}
            templateData={templateData}
          />,
          document.body
        )}
      {showEditTemplate &&
        createPortal(
          <CreateEditTemplateModal
            actionType="edit"
            templateData={templateData}
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
