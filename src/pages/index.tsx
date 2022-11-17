import { Avatar, Header } from '@components'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const user = {
    name: 'userTest',
    avatarUrl: '' // 'https://avatars.githubusercontent.com/u/79419167?v=4'
  }

  return (
    <div className="max-w-3xl h-full mx-auto">
      <Header>
        <Avatar.Root>
          {user.avatarUrl ? (
            <Avatar.Image url={user.avatarUrl} />
          ) : (
            <Avatar.AutoFill user={user} />
          )}
        </Avatar.Root>
      </Header>
    </div>
  )
}

export default Home
