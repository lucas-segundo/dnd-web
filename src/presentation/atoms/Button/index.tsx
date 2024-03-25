import { ButtonHTMLAttributes } from 'react'
import { ImSpinner2 } from 'react-icons/im'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export const Button = ({
  children,
  className,
  isLoading = false,
  ...props
}: ButtonProps) => {
  const styles = []

  className && styles.push(className)

  return (
    <button
      className={`flex justify-center items-center border rounded w-28 h-10 ${styles.join(' ')}`}
      {...props}
    >
      {isLoading ? (
        <ImSpinner2 data-testid="loading-icon" className="animate-spin" />
      ) : (
        children
      )}
    </button>
  )
}
