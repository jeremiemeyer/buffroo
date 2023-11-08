//@ts-nocheck
import {
  Input,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Icon,
  Button,
} from "@chakra-ui/react"
import { BiTimer } from "react-icons/bi"
import useWorkoutTimer from "@/hooks/useWorkoutTimer"
import Timer from "./Timer"

export default function TimerButton({ setShowStartTimerModal }) {
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
    expiryTimestamp,
    lastSetTimerDuration,
  } = useWorkoutTimer()

  return (
    <>
      {!isRunning ? (
        <Button
          onClick={() => setShowStartTimerModal(true)}
          colorScheme="gray"
          as={IconButton}
          icon={<Icon as={BiTimer} className="text-2xl" />}
          className="w-[100px]"
        />
      ) : (
        <>
          <div
            onClick={() => setShowStartTimerModal(true)}
            variant="ghost"
            className="bg-gray-200 w-[100px] h-8 rounded-xl text-center items-center justify-center flex z-[600] relative mr-1 cursor-pointer"
          >
            <div
              className={`bg-blue-500 w-full left-0 h-full rounded-xl origin-left relative z-0`}
              style={{
                transform: `scaleX(${totalSeconds / lastSetTimerDuration})`,
              }}
            />
            <div className="z-10 text-center justify-center absolute text-white font-semibold">
              <Timer />
            </div>
          </div>
        </>
      )}
    </>
  )
}
