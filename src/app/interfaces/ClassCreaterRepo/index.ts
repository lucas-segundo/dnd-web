import { Class } from 'domain/entities/Class'
import { ClassCreaterParams } from 'domain/useCases/ClassCreater'

export interface ClassCreaterRepo {
  create(params: ClassCreaterParams): Promise<Class>
}
