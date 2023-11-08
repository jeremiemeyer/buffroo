//@ts-nocheck
import { useStopwatch } from "react-timer-hook"
import WorkoutStopwatchContext from "../../context/WorkoutStopwatchProvider"
import useWorkoutStopwatch from "@/hooks/useWorkoutStopwatch"

function makeMeTwoDigits(n) {
  return (n < 10 ? "0" : "") + n
}

export default function Stopwatch() {
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
  } = useWorkoutStopwatch()

  return (
    <div style={{ textAlign: "center" }}>
      <div className="text-2xl">
        <span>{hours > 0 && `${hours}:`}</span>
        <span>{hours > 0 && minutes < 10 ? `0${minutes}`: minutes}</span>:
        <span>{makeMeTwoDigits(seconds)}</span>
      </div>
    </div>
  )
}
