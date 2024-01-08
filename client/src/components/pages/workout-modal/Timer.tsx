//@ts-nocheck
import useWorkoutTimer from "@/hooks/useWorkoutTimer"

function makeMeTwoDigits(n) {
  return (n < 10 ? "0" : "") + n
}

export default function Timer() {

  const {
    seconds,
    minutes,
  } = useWorkoutTimer()

  return (
    <>
      <span>{minutes}</span>:<span>{makeMeTwoDigits(seconds)}</span>
    </>
  )
}
