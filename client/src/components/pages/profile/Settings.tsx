//@ts-nocheck
import { Button } from "@/components/ui/button"
import { Button as ChakraButton, Icon, Select } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import useUserData from "@/hooks/api/useUserData"
import useToast from "@/hooks/useToast"
import useAuth from "@/hooks/useAuth"
import { PiExportLight } from "react-icons/pi"
import { createPortal } from "react-dom"
import ExportDataModal from "./ExportDataModal"

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
      <div className="flex flex-row justify-between mx-auto">
        <h1 className="pt-8 text-3xl font-semibold mb-4 px-4">Settings</h1>
      </div>
      {userData && (
        <div>
          {/* <button
            onClick={() =>
              console.log(userData)
            }
          >
            Consolelog "userData"
          </button> */}
          <div className="rounded-3xl border bg-white pt-8 pb-6 px-6 mx-auto">
            <div className="text-left space-y-4 pb-6">
              <div className="grid grid-cols-2">
                <span className="truncate ...">Unit system</span>
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
                >
                  <option value="imperial">Imperial</option>
                  <option value="metric">Metric</option>
                </Select>
              </div>
              <div className="grid grid-cols-2 pb-2">
                <span>Theme</span>

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
          </div>
        </div>
      )}
      {showExportDataModal &&
        createPortal(
          <ExportDataModal onClose={() => setShowExportDataModal(false)} />,
          document.body
        )}
    </>
  )
}
