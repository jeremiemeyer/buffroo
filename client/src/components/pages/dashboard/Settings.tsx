//@ts-nocheck
import { Button } from "@/components/ui/button"
import { Button as ChakraButton, Icon, Select } from "@chakra-ui/react"
import { useState } from "react"
import useToast from "@/hooks/useToast"
import useAuth from "@/hooks/useAuth"
import { PiExportLight } from "react-icons/pi"
import { createPortal } from "react-dom"
import ExportDataModal from "./modals/ExportDataModal"
import SquircleTile from "@/components/ui/squircle-tile"

export default function Settings({ userData, updateUserData }) {
  const [updatedUserPreferences, setUpdatedUserPreferences] = useState(
    userData.preferences
  )
  const [showExportDataModal, setShowExportDataModal] = useState(false)
  const { auth } = useAuth()
  const { preferencesSaved } = useToast()

  async function handleClick() {
    const success = await updateUserData({
      userId: auth.userId,
      updatedUserData: {
        ...userData,
        preferences: updatedUserPreferences,
      },
    })
    if (success === true) {
      preferencesSaved()
    }
  }

  return (
    <>
      {userData && (
        <SquircleTile>
          <div className="text-left space-y-4 pb-6">
            <div className="grid grid-cols-2">
              <span className="truncate ... dark:text-white dark:text-opacity-90">
                Unit system
              </span>
              <Select
                placeholder="Select option"
                value={updatedUserPreferences["unitSystem"]}
                onChange={(e) =>
                  setUpdatedUserPreferences({
                    ...updatedUserPreferences,
                    unitSystem: e.target.value,
                  })
                }
                name="unitsystem"
                borderColor="gray.400"
                className=" dark:bg-gray-600 dark:border-gray-600"
              >
                <option value="imperial">Imperial</option>
                <option value="metric">Metric</option>
              </Select>
            </div>
            <div className="grid grid-cols-2 pb-2">
              <span className="dark:text-white dark:text-opacity-90">
                Theme
              </span>

              <Select
                placeholder="Select option"
                value={updatedUserPreferences["theme"]}
                onChange={(e) =>
                  setUpdatedUserPreferences({
                    ...updatedUserPreferences,
                    theme: e.target.value,
                  })
                }
                name="theme"
                borderColor="gray.400"
                className=" dark:bg-gray-600 dark:border-gray-600"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-[200px] mx-auto">
            <ChakraButton
              onClick={() => setShowExportDataModal(true)}
              leftIcon={<Icon as={PiExportLight} />}
              fontSize={12}
              textColor="rgba(14,165,233,1)" //sky-500
              bg={"rgba(186,230,253,0.4)"}
              _hover={{ bg: "rgba(186,230,253,0.8)" }}
            >
              Export Data
            </ChakraButton>
            <Button onClick={handleClick}>Save preferences</Button>
          </div>

          {/* <button onClick={() => console.log(userPreferences)}>Console log userPreferences</button> */}
        </SquircleTile>
      )}
      {showExportDataModal &&
        createPortal(
          <ExportDataModal onClose={() => setShowExportDataModal(false)} />,
          document.body
        )}
    </>
  )
}
