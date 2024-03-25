import { vi, Mocked } from 'vitest'
import { ClassCreater, ClassCreaterParams } from '.'
import { faker } from '@faker-js/faker'

export const mockClassCreaterParams = (): Mocked<ClassCreaterParams> => ({
  name: faker.lorem.word(),
})

export const mockClassCreater = (): Mocked<ClassCreater> => ({
  create: vi.fn(),
})
