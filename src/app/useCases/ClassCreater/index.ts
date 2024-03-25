import { ClassCreaterRepo } from 'app/interfaces/ClassCreaterRepo'
import { Class } from 'domain/entities/Class'
import { ClassCreater, ClassCreaterParams } from 'domain/useCases/ClassCreater'

export class ClassCreaterImpl implements ClassCreater {
  constructor(private readonly classCreaterRepo: ClassCreaterRepo) {}

  async create(params: ClassCreaterParams): Promise<Class> {
    const createdClass = await this.classCreaterRepo.create(params)

    return createdClass
  }
}
