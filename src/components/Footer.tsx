import { Text } from '@components'

const Footer = () => {
  return (
    <footer className="flex flex-col gap-1">
      <Text className="text-gray-600 font-medium text-xs">About</Text>
      <Text className="text-gray-600 font-medium text-xs">
        @ 2022 SUSHI by kataik
      </Text>
    </footer>
  )
}

export { Footer }
