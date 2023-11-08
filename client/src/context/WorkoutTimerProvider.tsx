//@ts-nocheck
import { createContext, useState } from "react"
import Timer from "@/components/workout/Timer"
import { useTimer } from "react-timer-hook"

const WorkoutTimerContext = createContext({})

export const WorkoutTimerProvider = ({ children }) => {
  const [lastSetTimerDuration, setLastSetTimeDuration] = useState(null)
  const expiryTimestamp = new Date()

  function handleExpire() {
    navigator.vibrate =
      navigator.vibrate ||
      navigator.webkitVibrate ||
      navigator.mozVibrate ||
      navigator.msVibrate
    const time = new Date()
    time.setSeconds(time.getSeconds())
    restart(time) // sets to 0
    pause() // isRunning is now false
    if (navigator.vibrate) {
      navigator.vibrate(1000)
    }
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
