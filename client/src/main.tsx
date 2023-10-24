//@ts-nocheck
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { AuthProvider } from "./context/AuthProvider"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { WorkoutStatusProvider } from "./context/WorkoutStatusProvider.tsx"
import { WorkoutDataProvider } from "./context/WorkoutDataProvider.tsx"
import { WorkoutTimerProvider } from "./context/WorkoutTimerProvider.tsx"

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}

const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WorkoutStatusProvider>
          <WorkoutDataProvider>
            <WorkoutTimerProvider>
              <ChakraProvider theme={theme}>
                <App />
              </ChakraProvider>
            </WorkoutTimerProvider>
          </WorkoutDataProvider>
        </WorkoutStatusProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
