import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'
import { mockClassCreater } from 'domain/useCases/ClassCreater/mock'
import { Class } from '.'
import { Class as ClassModel } from 'domain/entities/Class'

const makeSUT = () => {
  const classCreater = mockClassCreater()
  render(<Class classCreater={classCreater} />)
  return { classCreater }
}

describe('Class', () => {
  it('should call class creater with right params', async () => {
    const { classCreater } = makeSUT()

    const name = faker.person.firstName()
    const user = userEvent.setup()

    const nameInput = screen.getByTestId('name-input')
    await user.clear(nameInput)
    await user.type(nameInput, name)

    await user.click(screen.getByTestId('create-button'))

    expect(classCreater.create).toBeCalledWith({ name })
  })

  it('should show created class', async () => {
    const { classCreater } = makeSUT()

    const expectedClass: ClassModel = {
      id: faker.string.uuid(),
      name: 'Paladin',
    }
    classCreater.create.mockResolvedValue(expectedClass)
    const user = userEvent.setup()

    const nameInput = screen.getByTestId('name-input')
    await user.clear(nameInput)
    await user.type(nameInput, expectedClass.name)

    await user.click(screen.getByTestId('create-button'))

    expect(await screen.findByText(/Paladin/i)).toBeVisible()
  })
})
