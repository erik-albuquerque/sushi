import { Text } from '@components'
import clsx from 'clsx'

type HashtagProps = {
  title: string
  className?: string
}

const Hashtag: React.FC<HashtagProps> = ({
  title,
  className
}: HashtagProps) => {
  return <Text className={clsx('font-bold', className)}>#{title}</Text>
}

export { Hashtag }
