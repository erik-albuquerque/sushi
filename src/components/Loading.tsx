import { ComponentProps } from 'react'
import { TailSpin } from 'react-loader-spinner'

type LoadingProps = ComponentProps<typeof TailSpin>

const Loading: React.FC<LoadingProps> = ({ ...rest }: LoadingProps) => {
  return <TailSpin {...rest} />
}

export { Loading }
