import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

// eslint-disable-next-line @typescript-eslint/ban-types
type CheckboxProps = CheckboxPrimitive.CheckboxProps & {}

const Checkbox: React.FC<CheckboxProps> = ({ ...rest }) => {
  return (
    <CheckboxPrimitive.Root
      className="w-4 h-4 p-[2px] rounded ring-2 ring-gray-700"
      {...rest}
    >
      <CheckboxPrimitive.Indicator asChild>
        <Check className="w-3 h-3 text-red-500" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
