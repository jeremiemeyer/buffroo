import "@/App.css"
import Home from "@/pages/Home.tsx"
import Register from "@/pages/Register.tsx"
import Login from "@/pages/Login.tsx"
import Profile from "@/pages/Profile.tsx"
import History from "@/pages/History.tsx"
import Exercises from "@/pages/Exercises.tsx"
import Unauthorized from "@/pages/Unauthorized.tsx"
import NotFound from "@/components/NotFound.tsx"
import RequireAuth from "@/components/RequireAuth.tsx"
import PersistLogin from "@/components/PersistLogin.tsx"
import { Routes, Route } from "react-router-dom"
import LoginRegister from "@/pages/LoginRegister.tsx"
import { AppLayout } from "@/components/AppLayout.tsx"
import { ExercisesProvider } from "@/context/api/ExercisesProvider.tsx"
import { SessionsProvider } from "@/context/api/SessionsProvider.tsx"
import { TemplatesProvider } from "./context/api/TemplatesProvider"

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
}

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="login" element={<LoginRegister children={<Login />} />} />
      <Route
        path="register"
        element={<LoginRegister children={<Register />} />}
      />
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* protected routes */}
      <Route element={<AppLayout />}>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<TemplatesProvider><Home /></TemplatesProvider>} />
            <Route path="/history" element={<SessionsProvider><History /></SessionsProvider>} />
            <Route path="/profile" element={<SessionsProvider><Profile /></SessionsProvider>} />
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
