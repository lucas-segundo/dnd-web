import { Button } from 'presentation/atoms/Button'
import Link from 'presentation/atoms/Link'

export const MainMenu = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl">Welcome to DND</h1>
      <Link to="/classes">
        <Button>Create Class</Button>
      </Link>
    </div>
  )
}
