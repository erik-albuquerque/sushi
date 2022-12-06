import { ReactNode } from 'react'
import { LogoBadge, LogoBadgeProps } from './Logo-Badge'
import { LogoSvg } from './Logo-Svg'

type LogoRootProps = {
  children?: ReactNode
}

const LogoRoot: React.FC<LogoRootProps> = ({ children }: LogoRootProps) => {
  return <div className="flex flex-row items-center gap-4">{children}</div>
}

const Logo = {
  Root: LogoRoot,
  Badge: LogoBadge,
  Logo: LogoSvg
}

export type { LogoRootProps, LogoBadgeProps }
export { Logo }
