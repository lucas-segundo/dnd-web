import { faker } from '@faker-js/faker'
import { RemoteClass } from '.'

export const mockRemoteClass = (): RemoteClass => ({
  data: {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
  },
})
