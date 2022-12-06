import { clsx } from 'clsx'
import { ReactNode } from 'react'
import { DividerDivider } from './DividerDivider'

type DividerRootProps = {
  children: ReactNode
  className?: string
}

const DividerRoot: React.FC<DividerRootProps> = ({
  children,
  className
}: DividerRootProps) => {
  return (
    <div
      className={clsx(
        'w-full max-w-sm flex flex-row items-center gap-2',
        className
      )}
    >
      {children}
    </div>
  )
}

const Divider = {
  Root: DividerRoot,
  Line: DividerDivider
}

export { Divider }
