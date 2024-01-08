//@ts-nocheck
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { RoughNotation } from "react-rough-notation"

const FadeInSlideUpText = () => {
  const [showNotation, setShowNotation] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowNotation(true)
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <motion.div className="">
      <motion.h4
        style={{
          opacity: 0, // Start with 0 opacity
        }}
        className="flex text-[22px] text-center justify-center md:text-[28px] text-primary mx-auto pt-12 mb-4 md:mb-8"
        initial={{ y: "80%", opacity: 0 }} // Initially, the text is fully off-screen below with 0 opacity
        animate={{ y: 0, opacity: 1 }} // Animate to y: 0 (slide up) and opacity: 1 (fade in)
        transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }} // Adjust the duration and easing function as needed
      >
        A gym trainer in{" "}
        <RoughNotation type="underline" show={showNotation}>
          your pocket.
        </RoughNotation>
      </motion.h4>
    </motion.div>
  )
}

export default FadeInSlideUpText
