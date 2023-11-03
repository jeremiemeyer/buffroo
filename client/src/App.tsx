import "./App.css"
import Home from "./pages/Home.tsx"
import Register from "./pages/Register.tsx"
import Login from "./pages/Login.tsx"
import Profile from "./pages/Profile.tsx"
import History from "./pages/History.tsx"
import Exercises from "./pages/Exercises.tsx"
import Unauthorized from "./pages/Unauthorized.tsx"
import NotFound from "./components/NotFound.tsx"
import RequireAuth from "./components/RequireAuth.tsx"
import PersistLogin from "./components/PersistLogin.tsx"
import { Routes, Route } from "react-router-dom"
import LoginRegister from "./pages/LoginRegister.tsx"
import { AppLayout } from "./components/AppLayout.tsx"

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
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/exercises" element={<Exercises />} />
          </Route>
        </Route>
      </Route>

      {/* not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
