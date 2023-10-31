//@ts-nocheck
import { useRef, useState, useEffect } from "react"
import { Button } from "./ui/button"
import {
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
import axios from "./../api/axios"
import { Link } from "react-router-dom"
import Particles from "react-particles"
import type { Engine } from "tsparticles-engine"
import { loadFull } from "tsparticles"
import { ISourceOptions } from "tsparticles-engine"
import particlesOptions from "./../particles.json"
import { useCallback } from "react"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const REGISTER_URL = "/register"

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()
  const infoRef = useRef()
  const emailRef = useRef()

  const [user, setUser] = useState("")
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [pwd, setPwd] = useState("")
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState("")
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState("")
  const [infoMsg, setInfoMsg] = useState("")

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user))
  }, [user])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg("")
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry")
      return
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd, email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      console.log(response?.data)
      console.log(response?.accessToken)
      console.log(JSON.stringify(response))
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setInfoMsg("Registration successful!")
      setUser("")
      setEmail("")
      setPwd("")
      setMatchPwd("")
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response")
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken")
      } else {
        setErrMsg("Registration Failed")
      }
      errRef.current.focus()
    }
  }

  return (
    <>
      <h1 className="text-4xl text-white pb-8 z-[600]">Register</h1>

      <div className="bg-glassmorphism2 rounded-3xl p-12 z-[600] xl:min-w-[500px]">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <p
          ref={infoRef}
          className={infoMsg ? "infomsg" : "offscreen"}
          aria-live="assertive"
        >
          {infoMsg}
        </p>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* Username */}
            <InputGroup borderRadius="16px">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                <EmailIcon color="gray.500" />
              </InputLeftElement>
              <Input
                id="username"
                ref={userRef}
                placeholder="Username"
                autoComplete="off"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                borderRadius="16px"
                borderColor="gray.400"
                required
              />

              <InputRightElement>
                {validName && <CheckIcon color="green.500" />}
                {!validName && user && <CloseIcon color="red.500" />}
              </InputRightElement>
            </InputGroup>
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            {/* Email */}
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                <EmailIcon color="gray.500" />
              </InputLeftElement>
              <Input
                id="email"
                ref={emailRef}
                placeholder="E-mail"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                borderRadius="16px"
                borderColor="gray.400"
                required
              />

              <InputRightElement>
                {validEmail && <CheckIcon color="green.500" />}
                {!validEmail && email && <CloseIcon color="red.500" />}
              </InputRightElement>
            </InputGroup>
            <p
              id="uidnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must be a valid email address.
            </p>

            {/* Password */}
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                <LockIcon color="gray.500" />
              </InputLeftElement>
              <Input
                id="password"
                placeholder="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                type="password"
                borderRadius="16px"
                borderColor="gray.400"
                required
              />

              <InputRightElement>
                {validPwd && <CheckIcon color="green.500" />}
                {!validPwd && pwd && <CloseIcon color="red.500" />}
              </InputRightElement>
            </InputGroup>
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            {/* Password confirmation */}
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                <LockIcon color="gray.500" />
              </InputLeftElement>
              <Input
                id="confirm_pwd"
                placeholder="Confirm Password"
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                type="password"
                borderRadius="16px"
                borderColor="gray.400"
                required
              />

              <InputRightElement>
                {validMatch && matchPwd && <CheckIcon color="green.500" />}
                {!validMatch && matchPwd && <CloseIcon color="red.500" />}
              </InputRightElement>
            </InputGroup>
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
          </Stack>
          <div className="mt-4 flex flex-col">
            {!validName || !validPwd || !validMatch ? (
              <Button disabled>Sign Up</Button>
            ) : (
              <Button>Sign Up</Button>
            )}
          </div>
        </form>
        <p className="pt-4">
          Already registered?
          <br />
          <Link to="/login">
            <span className="text-black underline">Sign In</span>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Register
