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
        className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white hover:bg-sky-50 dark:hover:bg-gray-700 hover:border-blue-200 dark:hover:border-gray-400 rounded-3xl mx-auto cursor-pointer w-full"
        onClick={() => setShowConfirmStartWorkoutFromTemplateModal(true)}
      >
        <div className="p-4">
          <div className="flex justify-between items-center pb-4">
            <h1 className="dark:text-white dark:text-opacity-90 text-xl md:text-2xl font-semibold truncate ...">{templateData.name}</h1>
            <div onClick={(e) => e.stopPropagation()}>
            {/* <button onClick={() => console.log(templateData)}>Consolelog templateData</button> */}

              <Menu variant="filled">
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<Icon as={FaEllipsisH} />}
                  textColor="rgba(14,165,233,1)" //sky-500
                  bg={"rgba(186,230,253,0.4)"}
                  _hover={{ bg: "rgba(186,230,253,0.8)"}}
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
            <ul className="dark:text-white dark:text-opacity-70">
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
