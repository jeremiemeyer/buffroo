//@ts-nocheck
import { Button } from "@/components/ui/button"
import { Select } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import useUserData from "@/hooks/api/useUserData"
import useToast from "@/hooks/useToast"
import useAuth from "@/hooks/useAuth"

export default function Settings({ userData, updateUserData }) {
  const [updatedUserPreferences, setUpdatedUserPreferences] = useState(
    userData.preferences
  )
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
        <div>
          {/* <button
            onClick={() =>
              console.log(userData)
            }
          >
            Consolelog "userData"
          </button> */}
          <div className="rounded-3xl border bg-white pt-8 pb-6 px-6 max-w-[800px] mx-auto">
            <div className="text-left space-y-4 pb-6">
              <div className="grid grid-cols-2">
                <span>Preferred unit system</span>
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

            <Button onClick={handleClick}>Save preferences</Button>
            {/* <button onClick={() => console.log(userPreferences)}>Console log userPreferences</button> */}
          </div>
        </div>
      )}
    </>
  )
}
