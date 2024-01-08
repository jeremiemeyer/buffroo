//@ts-nocheck
import Particles from "react-particles"
import type { Engine } from "tsparticles-engine"
import { loadFull } from "tsparticles"
import { ISourceOptions } from "tsparticles-engine"
import particlesOptions from "../../../particles.json"
import { motion } from "framer-motion"
import { useCallback, useState } from "react"
import logo from "./../../../assets/icon.svg"
import FadeInSlideDownImage from "@/components/animations/fade-in-slide-down-image"
import FadeInSlideUpText from "@/components/animations/fade-in-slide-up-text"
import FadeInSlideUpButton from "@/components/animations/fade-in-slide-up-button"
import TypingImage from "@/components/animations/typing-image"
import IntroButton from "@/components/ui/intro-button"
import { Link } from "react-router-dom"
import FadeInOnEntry from "@/components/animations/fade-in-on-entry"
import "@fontsource/inconsolata"
import { FaArrowLeftLong } from "react-icons/fa6"
import AboutModal from "../landing/modals/AboutModal"
import ContactModal from "../landing/modals/ContactModal"
import { createPortal } from "react-dom"

export default function LoginRegister({ children }) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  return (
    <>
      <Particles
        className="z-0"
        options={particlesOptions as ISourceOptions}
        init={particlesInit}
      />
      <div className="h-screen grd__desktop bg-white dark:bg-black overflow-hidden">
        {/* Animation image qui descend  */}
        <FadeInSlideDownImage />

        {!children ? (
          <div className="z-10 text-center flex flex-col z-[10]">
            <motion.div
              className="relative"
              initial={{ marginTop: "-300px" }}
              animate={{ marginTop: "-300px" }} // Adjust the scale factor as needed
              transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }} // Adjust the duration and easing function as needed
            >
              <div className="flex items-center space-x-2 absolute left-[50%] -translate-x-[50%] -translate-y-[50%] pb-8 z-[10]">
                {/* Logo  */}
                <motion.img
                  initial={{ scale: 80, marginTop: "-200px" }}
                  animate={{ scale: 2, marginTop: "0px" }} // Adjust the scale factor as needed
                  transition={{ duration: 1, ease: "easeInOut", delay: "0.2" }} // Adjust the duration and easing function as needed
                  className="w-[38px] z-[10]"
                  src={logo}
                  alt="logo"
                />
                {/* Texte du logo  */}
                <TypingImage />
              </div>
            </motion.div>

            <FadeInSlideUpText />

            <div className="mt-16 md:mt-2 flex flex-col text-center gap-2">
              <FadeInSlideUpButton delay={1.5}>
                <Link to="/login">
                  <IntroButton title="Login" className="w-[250px]" />
                </Link>
              </FadeInSlideUpButton>
              <FadeInSlideUpButton delay={1.6}>
                <Link to="/register">
                  <IntroButton title="Register" className="w-[250px]" />
                </Link>
              </FadeInSlideUpButton>
            </div>
            <div className="fixed bottom-0 left-0 w-full h-8 items-center flex justify-center opacity-80 bg-white dark:bg-black text-black dark:text-white bg-opacity-40 z-0">
              <ul className="flex flex-row opacity-100 text-zinc-400 h-4 items-center">
                <li className="pr-4 border-r-2">
                  made with 💪 by{" "}
                  <a
                    href="https://www.jeremiemeyer.fr"
                    className="blue_gradient font-bold"
                  >
                    JM
                  </a>
                </li>
                <li
                  className="pl-4 pr-4 border-r-2 cursor-pointer dark:hover:text-white hover:text-black"
                  onClick={() => setShowAboutModal(true)}
                >
                  about
                </li>
                <li
                  className="pl-4 pr-4 cursor-pointer dark:hover:text-white hover:text-black"
                  onClick={() => setShowContactModal(true)}
                >
                  contact
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <FadeInOnEntry>{children}</FadeInOnEntry>
            </div>
            <div className="fixed bottom-[10px] left-1/2 -translate-x-1/2">
              <FadeInOnEntry>
                <Link
                  to="/"
                  className="text-2xl opacity-30 hover:opacity-90 transition-all duration-500 flex flex-row gap-4 flex-row items-center group text-black dark:text-white"
                >
                  <span className="pl-2 transition-transform group-hover:-translate-x-8 opacity-0  group-hover:opacity-100 transition-all duration-800 motion-reduce:transform-none">
                    <FaArrowLeftLong />
                  </span>
                  <span
                    className="font-light relative z-50 -translate-x-6 group-hover:-translate-x-8 transition-all duration-800"
                    style={{ fontFamily: "Inconsolata, monospace" }}
                  >
                    Back to Home
                  </span>
                </Link>
              </FadeInOnEntry>
            </div>
          </>
        )}
      </div>
      {showAboutModal &&
        createPortal(
          <AboutModal onClose={() => setShowAboutModal(false)} />,
          document.body
        )}
      {showContactModal &&
        createPortal(
          <ContactModal onClose={() => setShowContactModal(false)} />,
          document.body
        )}
    </>
  )
}
