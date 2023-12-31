//@ts-nocheck
import { useRef, useState, useEffect } from "react"
import {
  Button,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react"
import {
  PhoneIcon,
  CheckIcon,
  LockIcon,
  EmailIcon,
  CloseIcon,
} from "@chakra-ui/icons"
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "../api/axios"
import { Link } from "react-router-dom"
import Particles from "react-particles"
import type { Engine } from "tsparticles-engine"
import { loadFull } from "tsparticles"
import { ISourceOptions } from "tsparticles-engine"
import particlesOptions from "../particles.json"
import { useCallback } from "react"
import logo from "./../assets/logo.png"

export default function LoginRegister({ children }) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  return (
    <>
      <Particles
        className="z-0"
        options={particlesOptions as ISourceOptions}
        init={particlesInit}
      />
      <div className="bg-black w-screen h-screen flex flex-col justify-center items-center mx-auto my-auto z-[600]">
        <img src={logo} className="h-[200px] z-[800]" />
        {children}
      </div>
    </>
  )
}
