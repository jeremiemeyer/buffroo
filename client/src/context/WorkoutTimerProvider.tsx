//@ts-nocheck
import { createContext, useState } from "react"
import Stopwatch from "../components/Stopwatch"
import { useStopwatch } from "react-timer-hook"

const WorkoutTimerContext = createContext({})

export const WorkoutTimerProvider = ({ children }) => {
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
    <WorkoutTimerContext.Provider
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
    </WorkoutTimerContext.Provider>
  )
}

export default WorkoutTimerContext
