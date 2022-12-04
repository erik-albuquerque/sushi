type DividerDivider = {
  dark?: boolean
}

const DividerDivider: React.FC<DividerDivider> = ({
  dark = true
}: DividerDivider) => {
  return (
    <div
      className={`w-full border-[1px] ${
        dark ? 'border-gray-300' : 'border-white'
      }`}
    />
  )
}

export { DividerDivider }
