import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const location = useLocation()

  const goTop = () => {
    window.scrollTo({
      top: 0,
    })
  }

  return (
    <>
      <div className="fixed w-full bottom-0 z-[500] bg-glassmorphism2 bg-gray-800 bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-60 text-white flex flex-row justify-center border-t dark:border-gray-800">
        <Link to={"profile"} onClick={goTop}>
          <div
            className={`${
              location.pathname.startsWith("/profile")
                ? "bg-gray-800 dark:bg-gray-500"
                : "hover:bg-gray-700 dark:hover:bg-gray-700"
            } cursor-pointer py-2 px-4 `}
          >
            <i className="fa-solid fa-user" />
            <p>Profile</p>
          </div>
        </Link>

        <Link to={"history"} onClick={goTop}>
          <div
            className={`${
              location.pathname.startsWith("/history")
                ? "bg-gray-800 dark:bg-gray-500"
                : "hover:bg-gray-700 dark:hover:bg-gray-700"
            } cursor-pointer py-2 px-4 `}
          >
            <i className="fa-solid fa-clock" />
            <p>History</p>
          </div>
        </Link>

        <Link to={"/"} onClick={goTop}>
          <div
            className={`${
              location.pathname === "/" ? "bg-gray-800 dark:bg-gray-500" : "hover:bg-gray-700 dark:hover:bg-gray-700"
            } cursor-pointer py-2 px-4 `}
          >
            <i className="fa-solid fa-plus" />
            <p>Start</p>
          </div>
        </Link>

        <Link to={"exercises"} onClick={goTop}>
          <div
            className={`${
              location.pathname.startsWith("/exercises")
                ? "bg-gray-800 dark:bg-gray-500"
                : "hover:bg-gray-700 dark:hover:bg-gray-700"
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
