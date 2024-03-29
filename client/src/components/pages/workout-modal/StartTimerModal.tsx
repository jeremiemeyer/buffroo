//@ts-nocheck
import { Button } from "@/components/ui/button"
import useWorkoutTimer from "@/hooks/useWorkoutTimer"
import Timer from "./Timer"

export default function StartTimerModal({ onClose }) {
  const {
    totalSeconds,
    isRunning,
    pause,
    restart,
    lastSetTimerDuration,
    setLastSetTimeDuration,
  } = useWorkoutTimer()

  function handleStartTimer(e) {
    console.log(e.target.value)
    const time = new Date()
    time.setSeconds(time.getSeconds() + parseInt(e.target.value))
    setLastSetTimeDuration(parseInt(e.target.value))
    restart(time)
    onClose()
  }

  function handleSkip(e) {
    const time = new Date()
    time.setSeconds(time.getSeconds())
    restart(time) // sets to 0
    pause() // isRunning is now false
    onClose()
  }

  function addTime(duration) {
    const time = new Date()
    time.setSeconds(time.getSeconds() + totalSeconds + parseInt(duration))
    setLastSetTimeDuration(lastSetTimerDuration + parseInt(duration))
    restart(time)
  }

  const timer_options = [
    { value: 5, text: `5"` },
    { value: 30, text: `30"` },
    { value: 90, text: `1'30"` },
    { value: 120, text: `2'` },
    { value: 150, text: `2'30"` },
  ]

  return (
    <div
      onClick={onClose}
      className="fixed z-[700] inset-0 bg-slate-700/75 bg-glassmorphism3 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-[900] relative bg-gray-50 dark:bg-black bg-glassmorphism2 dark:bg-opacity-50 dark:border-gray-700 text-slate-900 px-6 pt-6 pb-6 rounded-2xl border border-slate-600  w-[350px]"
      >
        <div className="h-[5%] flex flex-col justify-between items-center">
          {!isRunning ? (
            <>
              {" "}
              <h1 className="text-2xl dark:text-white dark:text-opacity-90">
                Rest Timer
              </h1>
              <p className="py-4 dark:text-white dark:text-opacity-80">
                Select a timer to start.
              </p>
              <div className="grid grid-rows-2 gap-2">
                {timer_options.map((option) => (
                  <Button
                    key={option.value}
                    onClick={(e) => handleStartTimer(e)}
                    value={option.value}
                  >
                    {option.text}
                  </Button>
                ))}

                <Button onClick={onClose} variant="destructive">
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl dark:text-white dark:text-opacity-90">
                Rest Timer
              </h1>
              <div className="grid grid-rows-2 pt-8 text-center">
                <div className="grid grid-cols-3 text-center  gap-4 items-center">
                  <div
                    onClick={() => addTime(-10)}
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer rounded-full p-2 dark:text-white dark:text-opacity-80"
                  >
                    -10"
                  </div>
                  <div className="text-3xl text-center w-[90px] dark:text-white dark:text-opacity-90">
                    <Timer />
                  </div>
                  <div
                    onClick={() => addTime(10)}
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer rounded-full p-2 dark:text-white dark:text-opacity-80"
                  >
                    +10"
                  </div>
                </div>
              </div>
              <Button onClick={handleSkip} className="mb-2">
                Skip timer
              </Button>
              <Button onClick={onClose} variant="destructive">
                Go back
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
