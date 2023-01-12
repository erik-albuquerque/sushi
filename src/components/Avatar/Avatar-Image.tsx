import Image from 'next/image'

type AvatarImageProps = {
  url: string
  size?: number
}

const AvatarImage: React.FC<AvatarImageProps> = ({
  url,
  size = 30
}: AvatarImageProps) => {
  return (
    <Image
      src={url}
      className="h-8 w-8 rounded-full"
      alt="Avatar of the user"
      width={size}
      height={size}
      objectFit="cover"
    />
  )
}

export type { AvatarImageProps }
export { AvatarImage }
