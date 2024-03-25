import { ClassCreaterRepo } from 'app/interfaces/ClassCreaterRepo'
import axios from 'axios'
import { Class } from 'domain/entities/Class'
import { ClassCreaterParams } from 'domain/useCases/ClassCreater'
import { adaptRemoteClass } from 'infra/adapters/adaptRemoteClass'

export class AxiosClassCreaterRepo implements ClassCreaterRepo {
  constructor(private readonly baseURL: string) {}

  async create(params: ClassCreaterParams): Promise<Class> {
    const response = await axios.post(this.baseURL + '/classes', params)

    return adaptRemoteClass(response.data)
  }
}
