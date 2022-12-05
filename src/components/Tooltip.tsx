import * as RadixTooltip from '@radix-ui/react-tooltip'
import { clsx } from 'clsx'
import { ReactNode } from 'react'

type TooltipProps = RadixTooltip.TooltipContentProps & {
  label: string
  children: ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({
  label,
  children,
  ...rest
}: TooltipProps) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          <div className="relative">{children}</div>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={4}
            className={clsx(
              'inline-flex items-center rounded-md px-4 py-2.5',
              'bg-gray-700 text-white'
            )}
            {...rest}
          >
            {label}
            <RadixTooltip.Arrow className="fill-gray-700" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

export { Tooltip }
