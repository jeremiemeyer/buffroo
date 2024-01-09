//@ts-nocheck
import { Link, useLocation } from "react-router-dom"
import { VscGraph } from "react-icons/vsc";
import { CiClock2 } from "react-icons/ci"
import { CgMathPlus } from "react-icons/cg"
import { CiDumbbell } from "react-icons/ci"
import { Squircle } from "corner-smoothing"
import { NavbarGradientDark, NavbarGradientLight } from "@/components/StyledComponents"
import useTheme from "@/hooks/useTheme";

export default function Navbar() {
  const location = useLocation()
  const {theme} = useTheme()

  const goTop = () => {
    window.scrollTo({
      top: 0,
    })
  }

  const navbar_sections = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <VscGraph />,
    },
    {
      path: "/history",
      name: "History",
      icon: <CiClock2 />,
    },
    {
      path: "/start",
      name: "Start",
      icon: <CgMathPlus />,
    },
    {
      path: "/exercises",
      name: "Exercises",
      icon: <CiDumbbell />,
    },
  ]

  return (
    <>
      <Squircle
        cornerRadius={25}
        cornerSmoothing={1}
        as={theme==='dark' ? NavbarGradientDark : NavbarGradientLight}
        className="fixed z-[500] bottom-0 max-w-[900px] w-full justify-center mx-auto z-0 bg-glassmorphism-navbar bg-gray-800 bg-opacity-90 dark:bg-black/20 text-white flex flex-row"
      >
        {navbar_sections.map((section) => (
          <Link key={section.path} to={section.path} onClick={goTop} className="w-1/4">
            <div
              className={`${
                location.pathname.startsWith(section.path)
                  ? "bg-gray-600 bg-opacity-30 dark:bg-gray-200 dark:bg-opacity-10"
                  : "hover:opacity-100 dark:hover:opacity-100 transition-all opacity-90 dark:opacity-60"
              } cursor-pointer py-2 px-4 md:px-8 flex flex-col items-center mx-auto gap-1`}
            >
              <span className="text-3xl">{section.icon}</span>
              <span className="text-sm">{section.name}</span>
            </div>
          </Link>
        ))}
      </Squircle>
    </>
  )
}
