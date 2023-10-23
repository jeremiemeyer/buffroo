import "./App.css"
import Layout from "./components/Layout.tsx"
import Home from "./components/Home.tsx"
import Register from "./components/Register.tsx"
import Login from "./components/Login.tsx"
import Profile from "./components/Profile.tsx"
import History from "./components/History.tsx"
import Exercises from "./components/Exercises.tsx"
import Unauthorized from "./components/Unauthorized.tsx"
import NotFound from "./components/NotFound.tsx"
import RequireAuth from "./components/RequireAuth.tsx"
import PersistLogin from "./components/PersistLogin.tsx"
import { Routes, Route } from "react-router-dom"

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/exercises" element={<Exercises />} />
          </Route>
        </Route>

        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
