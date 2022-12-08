const timeFromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000)
}

export { timeFromDate }
