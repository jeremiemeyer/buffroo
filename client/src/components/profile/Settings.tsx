//@ts-nocheck
import { Button, Select } from "@chakra-ui/react"
import { useState } from "react"

export default function Settings() {
  const [settings, setSettings] = useState({
    unitSystem: "metric",
    theme: "light",
  })

  function handleChangeSettings(e) {
    const { name, value } = e.target
    setSettings({
      ...settings,
      [name]: value,
    })
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="rounded-3xl border bg-gray-200 pt-8 pb-6 px-6 max-w-[800px] mx-auto">
          <div className="text-left space-y-4 pb-6">
            <div className="grid grid-cols-2">
              <span>Preferred unit system</span>
              <Select
                placeholder="Select option"
                value={settings.unitSystem}
                onChange={handleChangeSettings}
                name="unitSystem"
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
                value={settings.theme}
                onChange={handleChangeSettings}
                name="theme"
                borderColor="gray.400"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </Select>
            </div>
          </div>

          <Button colorScheme="blue" borderRadius="16px">
            Save preferences
          </Button>
        </div>
      </div>
    </>
  )
}
