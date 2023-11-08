//@ts-nocheck
import { createContext, useState } from "react"
import Timer from "@/components/workout/Timer"
import { useTimer } from "react-timer-hook"

const WorkoutTimerContext = createContext({})

export const WorkoutTimerProvider = ({ children }) => {
  const [lastSetTimerDuration, setLastSetTimeDuration] = useState(null)
  const expiryTimestamp = new Date()

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => navigator.vibrate(1000),
  })

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
        resume,
        restart,
        lastSetTimerDuration,
        setLastSetTimeDuration,
      }}
    >
      {children}
    </WorkoutTimerContext.Provider>
  )
}

export default WorkoutTimerContext
