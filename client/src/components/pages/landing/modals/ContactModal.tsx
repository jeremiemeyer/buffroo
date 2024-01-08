//@ts-nocheck
import { useState, useEffect } from "react"
import { RoughNotation } from "react-rough-notation"
import "@fontsource/inconsolata"
import ZoomIn from "@/components/animations/zoom-in"
import mate from "./../../../../assets/kangaroo-beer.webp"
import { Squircle } from "corner-smoothing"

export default function ContactModal({ onClose }) {
  const [showNotation, setShowNotation] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowNotation(true)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div
      onClick={onClose}
      className="fixed z-[700] inset-0 bg-slate-700/40 bg-glassmorphism3 flex justify-center items-center"
    >
      <ZoomIn>
      <Squircle
          onClick={(e) => e.stopPropagation()}
          className="z-[900] relative bg-gray-50/40 bg-glassmorphism3 rounded-[50px] w-[500px] flex flex-col p-12 "
          cornerRadius={50}
          cornerSmoothing={1}
        >
          <h1 className="text-4xl pb-12">
            <RoughNotation type="underline" show={showNotation}>
              contact
            </RoughNotation>
          </h1>
          <p>You can contact me at contact@jeremiemeyer.fr</p>
          <img src={mate} width="50%" alt="" className="relative mx-auto my-6 rounded-full overflow-hidden" />


        </Squircle>
      </ZoomIn>
    </div>
  )
}
