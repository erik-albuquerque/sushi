import * as RadixCollapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import { CaretDown, CaretRight } from 'phosphor-react'
import { ReactNode, useState } from 'react'

type CollapsibleProps = {
  content: ReactNode
  children: ReactNode
  className?: string
}

const Collapsible: React.FC<CollapsibleProps> = ({
  content,
  children,
  className
}: CollapsibleProps) => {
  const [open, setOpen] = useState(true)

  return (
    <RadixCollapsible.Root
      className="w-full"
      open={open}
      onOpenChange={setOpen}
    >
      <RadixCollapsible.Trigger asChild>
        <div className={clsx('flex flex-row gap-1 cursor-pointer', className)}>
          {open ? (
            <CaretDown size={18} color="#333333" />
          ) : (
            <CaretRight size={18} color="#333333" />
          )}
          <div>{content}</div>
        </div>
      </RadixCollapsible.Trigger>

      <RadixCollapsible.Content className="flex flex-col gap-2 mt-2 ml-4 w-full">
        {children}
      </RadixCollapsible.Content>
    </RadixCollapsible.Root>
  )
}

export { Collapsible }
