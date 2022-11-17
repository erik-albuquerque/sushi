import Image from 'next/image'

type AvatarImageProps = {
  url: string
}

const AvatarImage: React.FC<AvatarImageProps> = ({ url }: AvatarImageProps) => {
  return (
    <Image
      src={url}
      className="h-8 w-8 rounded-full"
      alt="Avatar of the user"
      width={30}
      height={30}
      objectFit="cover"
    />
  )
}

export type { AvatarImageProps }
export { AvatarImage }
