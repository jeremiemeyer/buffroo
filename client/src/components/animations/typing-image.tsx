//@ts-nocheck
import { motion } from "framer-motion"
import "@fontsource/inconsolata"

const TypingImage = () => {
  return (
    <motion.div
      style={{
        overflow: "hidden",
        position: "relative",
        width: "200x", // Adjust the width as needed
        height: "36px", // Adjust the height as needed
        z: 0,
        
      }}
      initial={{ width: "180px", opacity: 0, x: -100}} // Initially, the image is fully off-screen to the right
      animate={{ width: "180px", opacity: 1, x: 0 }} // Animate to x: 0, revealing the image
      transition={{ duration: 1.5, ease: "easeInOut", delay: .75 }} // Adjust the duration and easing function as needed
    >
      <span className="pl-4 text-black dark:text-white text-5xl font-light" style={{fontFamily: 'Inconsolata, monospace'}}>Buffroo</span>
    </motion.div>
  )
}

export default TypingImage
