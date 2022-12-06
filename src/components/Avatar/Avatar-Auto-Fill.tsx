import { getColorName } from '@utils'
import { useCallback, useEffect, useState } from 'react'

type AvatarAutoFillProps = {
  user: {
    name: string
  }
}

const AvatarAutoFill: React.FC<AvatarAutoFillProps> = ({
  user
}: AvatarAutoFillProps) => {
  const [bgColor, setBgColor] = useState('')

  const getInitialsLetters = (str: string) => {
    const splitSrt = str.split(' ')

    if (splitSrt.length > 1) {
      const initials = `${splitSrt[0].split('')[0]}${
        splitSrt[1].split('')[0]
      }`.toUpperCase()
      return initials
    }

    const initialLetter = splitSrt[0].split('')[0].toUpperCase()

    return initialLetter
  }

  const initialsLetters = getInitialsLetters(user.name)

  const getColorFromLocalStorage = useCallback(() => {
    const colorName = getColorName()

    const colorFromLocalStorage = localStorage.getItem('user:autoFillColorName')

    if (colorFromLocalStorage) {
      setBgColor(`bg-${colorFromLocalStorage}-500`)
    } else {
      localStorage.setItem('user:autoFillColorName', colorName)

      setBgColor(`bg-${colorName}-500`)
    }
  }, [])

  useEffect(() => {
    getColorFromLocalStorage()

    return () => getColorFromLocalStorage()
  }, [getColorFromLocalStorage])

  return (
    <div
      className={`w-[30px] h-[30px] ${bgColor} rounded-full flex items-center justify-center`}
    >
      <span className="font-bold text-sm text-gray-50">{initialsLetters}</span>
    </div>
  )
}

export type { AvatarAutoFillProps }
export { AvatarAutoFill }
