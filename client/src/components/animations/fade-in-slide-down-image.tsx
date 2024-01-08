import { motion } from "framer-motion";
import logo from './../../assets/logo.png'

const FadeInSlideDownImage = () => {
  return (
    <motion.div className="relative z-0">
      <motion.img
        src={logo} // Replace with your image source
        alt="Fade In Slide Down Image"
        style={{
          opacity: 0, // Start with 0 opacity
          scale: 0.5,
          z: 0,
        }}
        className="mx-auto"
        initial={{ y: "-70%", opacity: 0 }} // Initially, the image is fully off-screen above with 0 opacity
        animate={{ y: "-20%", opacity: 0.35 }} // Animate to y: 0 (slide down) and opacity: 1 (fade in)
        transition={{ duration: 1.5, ease: "easeInOut", delay: .5 }} // Adjust the duration and easing function as needed
      />
    </motion.div>
  );
};

export default FadeInSlideDownImage;
