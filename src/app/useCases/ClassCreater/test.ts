import { mockClassCreaterRepo } from 'app/interfaces/ClassCreaterRepo/mock'
import { describe, expect, it } from 'vitest'
import { ClassCreaterImpl } from '.'
import { ClassCreaterParams } from 'domain/useCases/ClassCreater'
import { faker } from '@faker-js/faker'
import { Class } from 'domain/entities/Class'
import { mockClass } from 'domain/entities/Class/mock'
import { mockClassCreaterParams } from 'domain/useCases/ClassCreater/mock'

const makeSUT = () => {
  const repo = mockClassCreaterRepo()
  const sut = new ClassCreaterImpl(repo)
  return { sut, repo }
}

describe('ClassCreaterImpl', () => {
  it('should call repository with right params', () => {
    const { sut, repo } = makeSUT()
    const params: ClassCreaterParams = {
      name: faker.lorem.word(),
    }
    sut.create(params)

    expect(repo.create).toHaveBeenCalledWith(params)
  })

  it('should return a created class', async () => {
    const { sut, repo } = makeSUT()
    const params: ClassCreaterParams = {
      name: faker.lorem.word(),
    }
    const expectedClass: Class = {
      ...mockClass(),
      ...params,
    }
    repo.create.mockResolvedValue(expectedClass)

    const createdClass = await sut.create(params)

    expect(createdClass).toEqual(expectedClass)
  })

  it('should throw error if repository throws', async () => {
    const { sut, repo } = makeSUT()
    repo.create.mockRejectedValue(new Error())

    const promise = sut.create(mockClassCreaterParams())
    await expect(promise).rejects.toThrow(Error)
  })
})
