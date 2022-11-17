import { ReactNode } from 'react'
import { Logo } from '../Logo'

type HeaderProps = {
  children?: ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }: HeaderProps) => {
  return (
    <div className="mx-8 mt-8 flex flex-row justify-between items-center">
      <Logo.Root>
        <Logo.Logo />
        <Logo.Badge label="Pre-alpha" />
      </Logo.Root>
      {children}
    </div>
  )
}

export { Header }
