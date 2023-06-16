import { ReactNode } from "react"

interface ITitleProps {
  children: ReactNode
}

export default function Title({ children }: ITitleProps) {
  return <h2 className="text-3xl font-medium">{children}</h2>
}
