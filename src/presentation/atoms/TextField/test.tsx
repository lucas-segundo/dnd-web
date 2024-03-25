import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TextField } from './index'
import { faker } from '@faker-js/faker'

describe('TextField', () => {
  it('should renders with passed props', () => {
    const label = faker.lorem.word()
    render(
      <TextField label={label} id="test-id" placeholder="test placeholder" />,
    )

    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'test placeholder',
    )

    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('should renders with custom class', () => {
    render(<TextField label={faker.lorem.word()} className="custom-class" />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveClass('custom-class')
  })
})
