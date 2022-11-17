const colors = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'viole',
  'purple',
  'fuchsia',
  'pink',
  'rose'
]

const getColorName = () => {
  const colorPosition = Math.floor(Math.random() * colors.length)
  const colorName = colors[colorPosition]

  return colorName
}

export { getColorName }
