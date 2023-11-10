//@ts-nocheck
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react"
import { AuthProvider } from "@/context/AuthProvider"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { WorkoutStatusProvider } from "@/context/WorkoutStatusProvider.tsx"
import { WorkoutDataProvider } from "@/context/WorkoutDataProvider.tsx"
import { WorkoutStopwatchProvider } from "@/context/WorkoutStopwatchProvider.tsx"
import { WorkoutTimerProvider } from "@/context/WorkoutTimerProvider.tsx"
import { ToastProvider } from "@/context/ToastProvider.tsx"
import { TemplateDataProvider } from "@/context/TemplateDataProvider.tsx"
import { ThemeProvider } from "@/context/ThemeProvider.tsx"
import { UserDataProvider } from "./context/api/UserDataProvider.tsx"

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const zIndices = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
}

const theme = extendTheme({ colors, zIndices, config })

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserDataProvider>
          <WorkoutStatusProvider>
            <WorkoutDataProvider>
              <TemplateDataProvider>
                <WorkoutStopwatchProvider>
                  <WorkoutTimerProvider>
                    <ToastProvider>
                      <ChakraProvider theme={theme}>
                        <ColorModeScript
                          initialColorMode={theme.config.initialColorMode}
                        />
                        <ThemeProvider>
                          <App />
                        </ThemeProvider>
                      </ChakraProvider>
                    </ToastProvider>
                  </WorkoutTimerProvider>
                </WorkoutStopwatchProvider>
              </TemplateDataProvider>
            </WorkoutDataProvider>
          </WorkoutStatusProvider>
        </UserDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
