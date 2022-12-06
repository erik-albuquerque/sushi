type DividerLineProps = {
  dark?: boolean
}

const DividerLine: React.FC<DividerLineProps> = ({
  dark = true
}: DividerLineProps) => {
  return (
    <div
      className={`w-full border-[1px] ${
        dark ? 'border-gray-300' : 'border-white'
      }`}
    />
  )
}

export { DividerLine }
