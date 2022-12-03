import { ReactNode } from 'react'
import { TextInputIcon } from './TextInputIcon'
import { TextInputInput } from './TextInputInput'

type TextInputRootProps = {
  children: ReactNode
}

const TextInputRoot: React.FC<TextInputRootProps> = ({
  children
}: TextInputRootProps) => {
  return (
    <div className="flex items-center gap-3 h-12 py-4 px-3 rounded w-full border-2 border-gray-700 focus-within:border-red-500">
      {children}
    </div>
  )
}

const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon
}

export { TextInput }
