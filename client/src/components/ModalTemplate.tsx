//@ts-nocheck
import "@fontsource/inconsolata"
import { Squircle } from "corner-smoothing"

export default function ModalTemplate({ onClose, children }) {

  return (
    <div
      onClick={onClose}
      className="fixed z-[700] inset-0 bg-slate-700/80 bg-glassmorphism3 flex justify-center items-center"
    >

        <Squircle
          onClick={(e) => e.stopPropagation()}
          className="z-[900] relative bg-gray-50 dark:bg-black bg-glassmorphism2 dark:bg-opacity-60 w-[500px] flex flex-col p-8 m-2"
          cornerRadius={25}
          cornerSmoothing={1}
        >

        {children}
        </Squircle>
    </div>
  )
}
