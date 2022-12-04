import { ReactElement } from 'react'
import { IconBaseProps } from 'react-icons'
import { AiFillYoutube } from 'react-icons/ai'
import { FaSoundcloud, FaSpotify, FaTwitter } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

type IconProps = IconBaseProps & {
  name: string
}

const Icon = ({ name, ...props }: IconProps) => {
  const icons: { [key: string]: ReactElement } = {
    Google: <FcGoogle {...props} size={30} />,
    Spotify: <FaSpotify {...props} color="#1DB954" />,
    Twitter: <FaTwitter {...props} color="#1DA1F2" />,
    Youtube: <AiFillYoutube {...props} />,
    Soundcloud: <FaSoundcloud {...props} />
  }

  const IconFromIcons = icons[name]

  return IconFromIcons
}

export { Icon }
