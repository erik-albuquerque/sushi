import { ReactNode } from 'react'
import { AutoFill, AutoFillProps as AvatarAutoFillProps } from './AutoFill'
import { AvatarImage, AvatarImageProps } from './AvatarImage'

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
  AutoFill: AutoFill
}

export type { AvatarRootProps, AvatarImageProps, AvatarAutoFillProps }
export { Avatar }
