import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Link from '.'

describe('Link', () => {
  it('renders children correctly', () => {
    const text = 'Test Link'
    render(
      <BrowserRouter>
        <Link to="/test">{text}</Link>
      </BrowserRouter>,
    )

    const linkElement = screen.getByText(text)
    expect(linkElement).toBeInTheDocument()
  })

  it('has correct href attribute', () => {
    const text = 'Test Link'
    render(
      <BrowserRouter>
        <Link to="/test">{text}</Link>
      </BrowserRouter>,
    )

    const linkElement = screen.getByText(text)
    expect(linkElement).toHaveAttribute('href', '/test')
  })
})
