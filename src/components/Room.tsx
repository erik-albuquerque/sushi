import { Text } from '@components'
import { Room as RoomType } from '@types'
import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { Hash } from 'phosphor-react'

type RoomProps = LinkProps & {
  room: RoomType
  shouldMatchExactHref?: boolean
}

const Room: React.FC<RoomProps> = ({
  room,
  shouldMatchExactHref,
  ...rest
}: RoomProps) => {
  const { asPath } = useRouter()

  let isActive = false

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true
  }

  if (
    (!shouldMatchExactHref && asPath.startsWith(String(rest.href))) ||
    asPath.startsWith(String(rest.as))
  ) {
    isActive = true
  }

  return (
    <Link {...rest} passHref>
      <a>
        <div
          className={clsx(
            'flex flex-row items-center gap-1 max-w-[160px] justify-between py-2 px-3 rounded-xl cursor-pointer w-full select-none',
            `${isActive ? 'bg-gray-100 ' : 'transition hover:bg-gray-50'}`
          )}
        >
          <div className="flex flex-row items-center gap-1">
            {room.private ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 4C7 3.72386 6.77615 3.5 6.5 3.5H4.88001L5.18285 1.79369C5.21005 1.64053 5.09225 1.5 4.93672 1.5H4.44454C4.32332 1.5 4.21957 1.58696 4.19839 1.70631L3.88 3.5H2.09005C1.96861 3.5 1.86473 3.58728 1.84379 3.7069L1.75629 4.2069C1.72952 4.35988 1.84724 4.5 2.00255 4.5H3.705L3.175 7.5H1.38505C1.26361 7.5 1.15973 7.5873 1.13879 7.7069L1.05129 8.2069C1.02452 8.3599 1.14224 8.5 1.29755 8.5H3.00001L2.69713 10.2063C2.66995 10.3594 2.78773 10.5 2.94328 10.5H3.43547C3.55669 10.5 3.66044 10.4131 3.68162 10.2937L4 8.5H7L6.69715 10.2063C6.66995 10.3594 6.78775 10.5 6.9433 10.5H7.43545C7.5567 10.5 7.66045 10.4131 7.6816 10.2937L8 8.5H9.78995C9.9114 8.5 10.0153 8.4127 10.0362 8.2931L10.1237 7.7931C10.1505 7.6401 10.0328 7.5 9.87745 7.5H8.175L8.3379 6.5779C8.39115 6.27645 8.1593 6 7.85315 6C7.6143 6 7.40995 6.17145 7.3684 6.40665L7.1752 7.5H4.17523L4.70523 4.5H6.5C6.77615 4.5 7 4.27614 7 4Z"
                  fill="#333333"
                />
                <path
                  d="M10.5125 2.5V2C10.5125 1.44 10.025 1 9.5 1C8.975 1 8.5 1.44 8.5 2V2.5C8.22385 2.5 8 2.72386 8 3V4.5C8 4.77614 8.22385 5 8.5 5H9.5H10.5C10.7761 5 11 4.77614 11 4.5V2.9875C11 2.71826 10.7817 2.5 10.5125 2.5ZM10 2.5H9V2C9 1.71429 9.23335 1.5 9.5 1.5C9.76665 1.5 10 1.71429 10 2V2.5Z"
                  fill="#333333"
                />
              </svg>
            ) : (
              <Hash />
            )}

            <Text className="max-w-[90px] truncate ...">{room.title}</Text>
          </div>
          {isActive && (
            <Text className="font-medium text-xs">
              {room.participants.length}/5
            </Text>
          )}
        </div>
      </a>
    </Link>
  )
}

export { Room }
