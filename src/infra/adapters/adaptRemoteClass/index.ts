import { Class } from 'domain/entities/Class'
import { RemoteClass } from 'infra/data/RemoteClass'

export const adaptRemoteClass = ({ data }: RemoteClass): Class => ({
  id: data.id,
  name: data.name,
})
