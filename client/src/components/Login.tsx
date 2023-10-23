//@ts-nocheck
import { useRef, useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import {
  Button,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Checkbox,
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
import {
  Link,
  NavLink,
  UseNavigate,
  useLocation,
  useNavigate,
} from "react-router-dom"
import useInput from "../hooks/useInput"
import useToggle from "../hooks/useToggle"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const LOGIN_URL = "/auth"

const Login = () => {
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const userRef = useRef()
  const errRef = useRef()

  const [user, resetUser, userAttribs] = useInput("user", "") //useState("")
  const [pwd, setPwd] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [check, toggleCheck] = useToggle("persist", false)

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
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      console.log(JSON.stringify(response?.data))
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      setAuth({ user, pwd, roles, accessToken })
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
      <div className="bg-slate-800 w-full h-full flex justify-center items-center">
        <div className="bg-slate-200  rounded-2xl p-12 w-[600px] mx-auto my-auto">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-3xl font-semibold pb-8">Sign In</h1>
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
                  required
                />
              </InputGroup>
            </Stack>

            <Button mt={4} colorScheme="blue" type="submit">
              Sign In
            </Button>
            <Checkbox
              onChange={toggleCheck}
              isChecked={check}
              className="border-gray-400 py-4"
            >
              Trust this device
            </Checkbox>
          </form>
          <p>
            Need an account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link to="/register">
                <span className="text-black underline font-semibold">
                  Sign Up
                </span>
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
