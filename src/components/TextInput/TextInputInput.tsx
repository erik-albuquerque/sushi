import { InputHTMLAttributes } from 'react'

type TextInputInputProps = InputHTMLAttributes<HTMLInputElement> &
  Record<string, unknown>

const TextInputInput: React.FC<TextInputInputProps> = ({
  ...rest
}: TextInputInputProps) => {
  return (
    <input
      className="bg-transparent flex-1 outline-none text-gray-700 text-base placeholder:text-gray-400"
      {...rest}
    />
  )
}

export { TextInputInput }
