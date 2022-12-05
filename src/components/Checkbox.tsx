import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

// eslint-disable-next-line @typescript-eslint/ban-types
type CheckboxProps = CheckboxPrimitive.CheckboxProps & {}

const Checkbox: React.FC<CheckboxProps> = ({ ...rest }) => {
  return (
    <CheckboxPrimitive.Root
      className="w-5 h-5 p-[2px] rounded ring-2 ring-gray-700"
      {...rest}
    >
      <CheckboxPrimitive.Indicator asChild>
        <Check width="bold" className="w-4 h-4 text-red-500" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
