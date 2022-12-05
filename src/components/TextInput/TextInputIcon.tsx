import { Slot } from '@radix-ui/react-slot'
import { ReactNode } from 'react'

type TextInputIconProps = {
  children: ReactNode
}

const TextInputIcon: React.FC<TextInputIconProps> = ({
  children
}: TextInputIconProps) => {
  return <Slot className="w-6 h-6 text-gray-400">{children}</Slot>
}

export { TextInputIcon }
