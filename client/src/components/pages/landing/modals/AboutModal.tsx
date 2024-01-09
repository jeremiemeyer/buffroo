//@ts-nocheck
import { useState, useEffect } from "react"
import { RoughNotation } from "react-rough-notation"
import "@fontsource/inconsolata"
import ZoomIn from "@/components/animations/zoom-in"
import { Squircle } from "corner-smoothing"

export default function AboutModal({ onClose }) {
  const [showNotation, setShowNotation] = useState(false)

  const faq = [
    {
      title: `Why "Buff roo"?`,
      answer: `Roo is aussie slang for "kangaroo" and kangaroos are pretty buff. Hence "Buff roo".`,
    },
    {
      title: `How was the app made?`,
      answer: (
        <>
          The app uses React.js, Express.js and many libraries. You can check
          the full code{" "}
          <a
            className="hover:text-zinc-700"
            href="https://github.com/jeremiemeyer/buffroo"
            target="_blank"
          >
            on GitHub.
          </a>
          <a
            className="hover:text-zinc-700"
            href="https://buffroo-87a1e6eff5dd.herokuapp.com/api-docs"
            target="_blank"
          >
            API documentation here.
          </a>
        </>
      ),
    },
  ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowNotation(true)
    }, 1000)

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
          className="z-[900] relative bg-gray-50/40 bg-glassmorphism3 rounded-[50px] flex flex-col p-12 m-2"
          cornerRadius={50}
          cornerSmoothing={1}
        >
          <h1 className="text-4xl pb-12">
            <RoughNotation type="underline" show={showNotation}>
              about
            </RoughNotation>
          </h1>

          <p>
            This project was created by Jeremie Meyer as a labour of love and to
            showcase his ability to create stuff.
          </p>
          {faq.map((question) => (
            <>
              <h2 className="pt-8 text-2xl text-black">
                <RoughNotation
                  type="highlight"
                  show={showNotation}
                  color="rgba(255, 255, 255, 0.2)"
                  style={{ fontFamily: "Inconsolata, monospace" }}
                >
                  {question.title}
                </RoughNotation>
              </h2>
              <p className="pt-2 text-black">{question.answer}</p>
            </>
          ))}
        </Squircle>
      </ZoomIn>
    </div>
  )
}
