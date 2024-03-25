import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './index'
import { faker } from '@faker-js/faker'

describe('Button', () => {
  it('should renders correctly', () => {
    render(<Button>Test Button</Button>)
    const buttonElement = screen.getByRole('button', { name: /Test Button/i })
    expect(buttonElement).toBeInTheDocument()
  })

  it('should apply passed className', () => {
    render(<Button className="test-class" />)
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toHaveClass('test-class')
  })

  it('should render loading icon when isLoading is true', () => {
    const text = faker.lorem.words()
    render(<Button isLoading>{text}</Button>)

    const loadingIcon = screen.getByTestId('loading-icon')
    expect(loadingIcon).toBeInTheDocument()
    expect(screen.queryByText(text)).toBeNull()
  })
})
