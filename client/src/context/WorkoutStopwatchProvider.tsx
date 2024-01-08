//@ts-nocheck
import { createContext } from "react"
import { useStopwatch } from "react-timer-hook"

const WorkoutStopwatchContext = createContext({})

export const WorkoutStopwatchProvider = ({ children }) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false })


  return (
    <WorkoutStopwatchContext.Provider
      value={{
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
      }}
    >
      {children}
    </WorkoutStopwatchContext.Provider>
  )
}

export default WorkoutStopwatchContext
