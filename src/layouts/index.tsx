import { Avatar, Header, SideBar } from '@components'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const { data: session } = useSession()

  const user = {
    name: session?.user?.name,
    avatarUrl: session?.user?.image
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
      <main className="flex flex-row gap-4 mx-8 sm:gap-16 mt-8 md:mx-auto">
        <SideBar />
        {children}
      </main>
    </div>
  )
}

export { Layout }
