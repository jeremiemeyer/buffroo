//@ts-nocheck
import { createContext, useState } from "react"
import Timer from "@/components/workout/Timer"
import { useTimer } from "react-timer-hook"
import useToast from "@/hooks/useToast"

const WorkoutTimerContext = createContext({})

export const WorkoutTimerProvider = ({ children }) => {
  const [lastSetTimerDuration, setLastSetTimeDuration] = useState(null)
  const expiryTimestamp = new Date()

  function handleExpire() {
    const time = new Date()
    time.setSeconds(time.getSeconds())
    restart(time) // sets to 0
    pause() // isRunning is now false
  }

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
    onExpire: () => handleExpire(),
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
