//@ts-nocheck
import { Button } from "@/components/ui/button"
import { Select } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default function Settings({
  userPreferences,
  setUserPreferences,
  saveUserPreferences,
}) {
  useEffect(() => {
    console.log(userPreferences)
  }, [])

  function handleChangePreferences(e) {
    const { name, value } = e.target
    setUserPreferences({
      ...userPreferences,
      [name]: value,
    })
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-light">Settings</h1>
        <div className="rounded-3xl border bg-gray-200 pt-8 pb-6 px-6 max-w-[800px] mx-auto">
          <div className="text-left space-y-4 pb-6">
            <div className="grid grid-cols-2">
              <span>Preferred unit system</span>
              <Select
                placeholder="Select option"
                value={userPreferences.unitsystem}
                onChange={handleChangePreferences}
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
                value={userPreferences.theme}
                onChange={handleChangePreferences}
                name="theme"
                borderColor="gray.400"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </Select>
            </div>
          </div>

          <Button onClick={saveUserPreferences}>Save preferences</Button>
          {/* <button onClick={() => console.log(userPreferences)}>Console log userPreferences</button> */}
        </div>
      </div>
    </>
  )
}
