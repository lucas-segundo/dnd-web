import { vi, Mocked } from 'vitest'
import { ClassCreaterRepo } from '.'

export const mockClassCreaterRepo = (): Mocked<ClassCreaterRepo> => ({
  create: vi.fn(),
})
