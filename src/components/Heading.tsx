import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import { ReactNode } from 'react'

type HeadingProps = {
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  asChild?: boolean
  className?: string
}

const Heading: React.FC<HeadingProps> = ({
  size = 'md',
  asChild = false,
  children,
  className
}: HeadingProps) => {
  const Comp = asChild ? Slot : 'h2'

  return (
    <Comp
      className={clsx(
        'text-gray-700 font-bold font-sans',
        {
          'text-lg': size === 'sm',
          'text-xl': size === 'md',
          'text-2xl': size === 'lg'
        },
        className
      )}
    >
      {children}
    </Comp>
  )
}

export { Heading }
