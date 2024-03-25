import { makeClassCreater } from 'main/factories/useCases/makeClassCreater'
import { Class } from 'presentation/templates/Class'
import { MainMenu } from 'presentation/templates/MainMenu'
import { createBrowserRouter } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <MainMenu />,
  },
  {
    path: '/classes',
    element: <Class classCreater={makeClassCreater()} />,
  },
]

export const router = createBrowserRouter(routes, {
  basename: '/dnd-web',
})
