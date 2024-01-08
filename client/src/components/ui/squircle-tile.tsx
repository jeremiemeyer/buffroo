//@ts-nocheck
import React from "react"
import { Squircle } from "corner-smoothing"
import { StyledSquircle, StyledSquircleDark, StyledSquircleLight } from "@/components/StyledComponents"
import useTheme from "@/hooks/useTheme"

type SquircleTileProps = {
  children: React.ReactNode
  onClickAction?: () => void
}

export default function SquircleTile({
  children,
  onClickAction,
}: SquircleTileProps) {
  const { theme } = useTheme()

  return (
    <Squircle
      borderWidth={1}
      cornerRadius={20}
      cornerSmoothing={1}
      className={`w-full ${onClickAction ? "cursor-pointer" : ""}`}
      as={theme==='dark' ? StyledSquircleDark : StyledSquircleLight}
      onClick={onClickAction}
      style={{
        zIndex: 0, // Add your desired z-index value
        position: "relative",
      }}
    >
      {children}
    </Squircle>
  )
}
