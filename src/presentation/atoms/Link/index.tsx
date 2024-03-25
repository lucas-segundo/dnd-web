import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'

interface LinkProps extends RouterLinkProps {
  children: React.ReactNode
}

const Link = ({ children, ...props }: LinkProps) => {
  return <RouterLink {...props}>{children}</RouterLink>
}

export default Link
