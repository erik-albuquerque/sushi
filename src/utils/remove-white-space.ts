const removeWhiteSpace = (str: string) => {
  const text = str.split(' ').join('')

  return text
}

export { removeWhiteSpace }
