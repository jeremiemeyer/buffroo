type TitleProps = {
  children: React.ReactNode
}

export default function Title({ children }: TitleProps) {
  return <h1 className="text-[36px] dark:text-white dark:text-opacity-90">{children}</h1>
}
