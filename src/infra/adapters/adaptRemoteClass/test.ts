import { adaptRemoteClass } from './index'
import { Class } from 'domain/entities/Class'
import { RemoteClass } from 'infra/data/RemoteClass'
import { mockRemoteClass } from 'infra/data/RemoteClass/mock'
import { describe, expect, it } from 'vitest'

describe('adaptRemoteClass', () => {
  it('should correctly adapt a RemoteClass to a Class', () => {
    const remoteClass: RemoteClass = mockRemoteClass()

    const expectedClass: Class = {
      id: remoteClass.data.id,
      name: remoteClass.data.name,
    }

    expect(adaptRemoteClass(remoteClass)).toEqual(expectedClass)
  })
})
