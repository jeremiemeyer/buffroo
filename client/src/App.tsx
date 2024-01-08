//@ts-nocheck
import "@/App.css"
import Home from "@/pages/Home.tsx"
import Register from "@/pages/Register.tsx"
import Login from "@/pages/Login.tsx"
import History from "@/pages/History.tsx"
import Exercises from "@/pages/Exercises.tsx"
import Unauthorized from "@/pages/Unauthorized.tsx"
import NotFound from "@/components/NotFound.tsx"
import RequireAuth from "@/components/RequireAuth.tsx"
import PersistLogin from "@/components/PersistLogin.tsx"
import { Routes, Route } from "react-router-dom"
import LoginRegister from "@/components/pages/shared/LoginRegister"
import { AppLayout } from "@/components/layout/AppLayout"
import { ExercisesProvider } from "@/context/api/ExercisesProvider.tsx"
import { SessionsProvider } from "@/context/api/SessionsProvider.tsx"
import { TemplatesProvider } from "@/context/api/TemplatesProvider"
import Dashboard from "@/pages/Dashboard"

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
}

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<LoginRegister />} />
      <Route path="/login" element={<LoginRegister children={<Login />} />} />
      <Route
        path="/register"
        element={<LoginRegister children={<Register />} />}
      />
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* protected routes */}
      <Route
        element={
          <SessionsProvider>
            <AppLayout />
          </SessionsProvider>
        }
      >
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route
              path="/start"
              element={
                <TemplatesProvider>
                  <Home />
                </TemplatesProvider>
              }
            />
            <Route path="/history" element={<History />} />
            <Route
              path="/dashboard"
              element={
                <ExercisesProvider>
                  <Dashboard />
                </ExercisesProvider>
              }
            />
            <Route
              path="/exercises"
              element={
                <ExercisesProvider>
                  <Exercises />
                </ExercisesProvider>
              }
            />
          </Route>
        </Route>
      </Route>

      {/* not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
