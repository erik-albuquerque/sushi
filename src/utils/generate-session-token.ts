import { randomUUID } from 'crypto'

const generateSessionToken = () => {
  const sessionToken = randomUUID()

  return sessionToken
}

export { generateSessionToken }
