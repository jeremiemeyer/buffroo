//@ts-nocheck
import { useTimer } from "react-timer-hook"
import WorkoutTimerProvider from "@/context/WorkoutTimerProvider"
import useWorkoutTimer from "@/hooks/useWorkoutTimer"

function makeMeTwoDigits(n) {
  return (n < 10 ? "0" : "") + n
}

export default function Timer({ expiryTimestamp }) {

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
  } = useWorkoutTimer()

  return (
    <>
      <span>{minutes}</span>:<span>{makeMeTwoDigits(seconds)}</span>
      {/* <p>{isRunning ? "Running" : "Not running"}</p> */}
      {/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date()
          time.setSeconds(time.getSeconds() + 300)
          restart(time)
        }}
      >
        Restart
      </button> */}
    </>
  )
}
