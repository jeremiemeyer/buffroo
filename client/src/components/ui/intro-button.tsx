//@ts-nocheck
import "./button.css"
import { FaArrowRightLong } from "react-icons/fa6"

const IntroButton = ({
  onClick,
  title,
  limit,
  paddingB,
  className,
  disabled,
}) => {
  const DisabledButton = () => (
    <div
      className={`${
        limit ? "bg-light-grey" : "rounded-[40px] bg-primary opacity-50"
      }  z-10 ${
        !paddingB ? "bottom-4" : paddingB
      } ${className} rounded-xl px-4 py-3 mx-auto flex justify-center items-center text-[15px] text-center text-bold`}
    >
      <div className="blur-container backdrop-blur-4"></div>
      <p className="text-white text-sm font-light relative z-50 transition-all duration-800">
        {title}
      </p>
    </div>
  )
  return !disabled ? (
    <button
      onClick={onClick}
      className={`${
        limit ? "bg-light-grey" : "btn_custom_bg rounded-[40px] bg-primary"
      }  z-10 ${
        !paddingB ? "bottom-4" : paddingB
      } ${className} rounded-xl px-4 py-3 mx-auto flex justify-center items-center text-[15px] text-center text-bold group text-white`}
    >
      <div className="blur-container backdrop-blur-4"></div>
      <p className="text-white text-sm font-light relative z-50 translate-x-3 group-hover:-translate-x-1 transition-all duration-800">
        {title}
      </p>
      <span className="pl-2 transition-transform group-hover:translate-x-2 opacity-0  group-hover:opacity-100 transition-all duration-800 motion-reduce:transform-none">
        <FaArrowRightLong />
      </span>
    </button>
  ) : (
    <DisabledButton />
  )
}

export default IntroButton
