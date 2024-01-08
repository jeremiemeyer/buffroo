//@ts-nocheck
import { motion } from "framer-motion"

const FadeInSlideUpButton = ({ children, delay }) => {

  return (
      <motion.div
        initial={{ y: "100px", opacity: 0 }} // Initially, the button is fully off-screen below with 0 opacity
        animate={{ y: "0px", opacity: 1 }} // Animate to y: 0 (slide up) and opacity: 1 (fade in)
        transition={{ duration: 1.5, ease: "easeInOut", delay: delay }} // Adjust the duration and easing function as needed
      >
        {children}
      </motion.div>
  )
}

export default FadeInSlideUpButton
