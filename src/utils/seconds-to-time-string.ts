const secondsToTimeString = (seconds: number) => {
  const totalMs = seconds * 1000
  const date = new Date(totalMs).toISOString().slice(11, 19)

  return date
}

export { secondsToTimeString }
