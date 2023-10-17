import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./routes/root.tsx"
import Profile from "./routes/profile.tsx"
import History from "./routes/history.tsx"
import Exercises from "./routes/exercises.tsx"
import ErrorPage from "./components/error-page.tsx"
import Navbar from "./components/layout/Navbar/Navbar.tsx"

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "exercises",
        element: <Exercises />,
      },
    ]
  }

])

function App() {
  return (
    <div className="h-screen w-screen">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
