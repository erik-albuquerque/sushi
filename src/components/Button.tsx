import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  asChild?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  asChild = false,
  className,
  ...rest
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={clsx(
        'py-3 px-4 bg-red-500 rounded font-semibold text-white text-sm w-full transition-colors hover:bg-red-400',
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export { Button }
