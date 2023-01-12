import { getColorName, getInitialsLetters } from '@utils'
import { useCallback, useEffect, useState } from 'react'

type AvatarAutoFillProps = {
  user: {
    name: string
  }
  size?: 20 | 30
}

const AvatarAutoFill: React.FC<AvatarAutoFillProps> = ({
  user,
  size = 30
}: AvatarAutoFillProps) => {
  const [bgColor, setBgColor] = useState('')

  const initialsLetters = getInitialsLetters(user.name ?? '')

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
      className={`${
        size === 30 ? 'w-7 h-7' : size === 20 && 'w-6 h-6'
      } ${bgColor} rounded-full flex items-center justify-center`}
    >
      <span
        className={`font-bold ${
          size === 20 ? 'text-xs' : 'text-sm'
        } text-gray-50`}
      >
        {initialsLetters}
      </span>
    </div>
  )
}

export type { AvatarAutoFillProps }
export { AvatarAutoFill }
