import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const location = useLocation()

  return (
    <>
      <div className="fixed w-full bottom-0 z-[500] bg-gray-600 text-white flex flex-row justify-center">
        <Link to={"profile"}>
          <div
            className={`${
              location.pathname.startsWith("/profile")
                ? "bg-gray-800"
                : "hover:bg-gray-500"
            } cursor-pointer py-2 px-4 `}
          >
            <i className="fa-solid fa-user" />
            <p>Profile</p>
          </div>
        </Link>

        <Link to={"history"}>
          <div
            className={`${
              location.pathname.startsWith("/history")
                ? "bg-gray-800"
                : "hover:bg-gray-500"
            } cursor-pointer py-2 px-4 `}
          >
            <i className="fa-solid fa-clock" />
            <p>History</p>
          </div>
        </Link>

        <Link to={"/"}>
          <div
            className={`${
              location.pathname === "/"
                ? "bg-gray-800"
                : "hover:bg-gray-500"
            } cursor-pointer py-2 px-4 `}
          >
            <i className="fa-solid fa-plus" />
            <p>Start</p>
          </div>
        </Link>

        <Link to={"exercises"}>
          <div
            className={`${
              location.pathname.startsWith("/exercises")
                ? "bg-gray-800"
                : "hover:bg-gray-500"
            } cursor-pointer py-2 px-4 `}
          >
            <i className="fa-solid fa-dumbbell" />
            <p>Exercises</p>
          </div>
        </Link>
      </div>
    </>
  )
}
