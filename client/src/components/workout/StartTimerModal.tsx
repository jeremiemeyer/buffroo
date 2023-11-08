//@ts-nocheck
import { Input } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import useWorkoutTimer from "@/hooks/useWorkoutTimer"
import Timer from "./Timer"

export default function StartTimerModal({ onClose }) {
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

  return (
    <div
      // onClick={onClose}
      className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-[900] relative bg-gray-50 text-slate-900  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 h-[400px] w-[350px]"
      >
        <div className="h-[5%] flex flex-col justify-between items-center">
          {!isRunning ? (
            <>
              {" "}
              <h1 className="text-2xl">Rest Timer</h1>
              <p className="py-4">Select a timer to start.</p>
              <div className="grid grid-rows-2 gap-2">
                <Button onClick={(e) => handleStartTimer(e)} value={5}>
                  5"
                </Button>
                <Button onClick={(e) => handleStartTimer(e)} value={30}>
                  30"
                </Button>
                <Button onClick={(e) => handleStartTimer(e)} value={90}>
                  1'30"
                </Button>
                <Button onClick={(e) => handleStartTimer(e)} value={120}>
                  2'
                </Button>
                <Button onClick={onClose} variant="destructive">
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl">Rest Timer</h1>
              <div className="grid grid-rows-2 gap-2">
                <div className="text-3xl"><Timer /></div>
                

                <Button onClick={handleSkip}>Skip</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
