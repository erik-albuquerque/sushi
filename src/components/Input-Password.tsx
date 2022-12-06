import { Eye, EyeSlash, Lock } from 'phosphor-react'
import { InputHTMLAttributes, useCallback, useState } from 'react'
import { TextInput } from './TextInput'

// eslint-disable-next-line @typescript-eslint/ban-types
type InputPasswordProps = InputHTMLAttributes<HTMLInputElement> & {}

const InputPassword: React.FC<InputPasswordProps> = ({
  ...rest
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword)
  }, [showPassword])

  return (
    <TextInput.Root>
      <TextInput.Icon>
        <Lock />
      </TextInput.Icon>
      <TextInput.Input
        id="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="***************"
        {...rest}
      />
      <div onClick={handleShowPassword}>
        {showPassword ? (
          <TextInput.Icon>
            <EyeSlash />
          </TextInput.Icon>
        ) : (
          <TextInput.Icon>
            <Eye />
          </TextInput.Icon>
        )}
      </div>
    </TextInput.Root>
  )
}

export { InputPassword }
