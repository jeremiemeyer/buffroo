import { Outlet } from "react-router-dom"
import Navbar from "./layout/Navbar/Navbar"

export default function Layout() {
  return (
    <>
      <main className="h-screen w-screen">
        <Outlet />
      </main>
    </>
  )
}
