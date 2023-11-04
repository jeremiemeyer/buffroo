type TitleProps = {
  children: React.ReactNode
}

export default function Title({ children }: TitleProps) {
  return <h1 className="text-[36px] dark:bg-slate-600">{children}</h1>
}
