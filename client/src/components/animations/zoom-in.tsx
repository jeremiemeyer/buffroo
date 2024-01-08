//@ts-nocheck
import React from "react"
import { motion } from "framer-motion"

export default function ZoomIn({children}) {
  return (
    <motion.div
      initial={{ scale: 0.01, marginTop: "-200px" }}
      animate={{ scale: 1, marginTop: "0px" }} // Adjust the scale factor as needed
      transition={{ duration: 0.1, ease: "easeInOut", delay: 0 }} // Adjust the duration and easing function as needed
    >
      {children}
    </motion.div>
  )
}
