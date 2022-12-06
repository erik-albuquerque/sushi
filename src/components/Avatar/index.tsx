import { ReactNode } from 'react'
import { AvatarAutoFill, AvatarAutoFillProps } from './Avatar-Auto-Fill'
import { AvatarImage, AvatarImageProps } from './Avatar-Image'

type AvatarRootProps = {
  children: ReactNode
}

const AvatarRoot: React.FC<AvatarRootProps> = ({
  children
}: AvatarRootProps) => {
  return <div className="flex items-center select-none">{children}</div>
}

const Avatar = {
  Root: AvatarRoot,
  Image: AvatarImage,
  AutoFill: AvatarAutoFill
}

export type { AvatarRootProps, AvatarImageProps, AvatarAutoFillProps }
export { Avatar }
