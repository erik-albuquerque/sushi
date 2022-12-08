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

export { getInitialsLetters }
