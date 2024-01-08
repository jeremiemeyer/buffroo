//@ts-nocheck
import { useRef, useState, useEffect } from "react"
import useAuth from "@/hooks/useAuth"
import useInput from "@/hooks/useInput"
import useToggle from "@/hooks/useToggle"
import IntroButton from "@/components/ui/intro-button"
import axios from "@/api/axios"
import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Checkbox,
} from "@chakra-ui/react"
import { LockIcon, EmailIcon } from "@chakra-ui/icons"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "@fontsource/inconsolata"
import { Squircle } from "corner-smoothing"
import { GradientBox } from "@/components/StyledComponents"

const LOGIN_URL = "/auth"

const Login = () => {
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/start"

  const userRef = useRef()
  const errRef = useRef()

  const [user, resetUser, userAttribs] = useInput("user", "") //useState("")
  const [pwd, setPwd] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [check, toggleCheck] = useToggle("persist", true)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      console.log(JSON.stringify(response?.data))
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      const userId = response?.data?.userId
      const username = response?.data?.username
      setAuth({ username, userId, roles, accessToken })
      // setUser("")
      resetUser("")
      setPwd("")
      navigate(from, { replace: true })
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response")
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password")
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized")
      } else {
        setErrMsg("Login Failed")
      }
      errRef.current.focus()
    }
  }

  return (
    <>
      <h1
        className="text-4xl pb-8 text-black dark:text-white z-[600]"
        style={{ fontFamily: "Inconsolata, monospace" }}
      >
        Sign In
      </h1>
      <Squircle
        onClick={(e) => e.stopPropagation()}
        className="z-[900] relative bg-gray-100/40 dark:bg-gray-500/40 bg-glassmorphism3 rounded-[50px] w-[500px] flex flex-col p-12 xl:min-w-[500px] text-black dark:text-white min-w-[90vw] md:min-w-0"
        cornerRadius={50}
        cornerSmoothing={1}
        as={GradientBox}
      >
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* Username */}
            <InputGroup>
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
                {...userAttribs}
                //   onFocus={() => setUserFocus(true)}
                //   onBlur={() => setUserFocus(false)}
                borderRadius="16px"
                borderColor="gray.400"
                bo
                required
              />
            </InputGroup>

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
                //   onFocus={() => setPwdFocus(true)}
                //   onBlur={() => setPwdFocus(false)}
                type="password"
                borderRadius="16px"
                borderColor="gray.400"
                required
              />
            </InputGroup>
          </Stack>
          <div className="flex flex-col mt-4 items-center">
            <IntroButton title="Sign In" className="w-[250px]" />

            <Checkbox
              onChange={toggleCheck}
              isChecked={check}
              className="border-gray-400 py-4"
            >
              Stay logged in
            </Checkbox>
          </div>
        </form>
      </Squircle>
      <p className="pt-8 text-black dark:text-white">
        Need an account?
        <br />
        <span className="line">
          {/*put router link here*/}
          <Link to="/register">
            <span className="underline">Sign Up</span>
          </Link>
        </span>
      </p>
    </>
  )
}

export default Login
