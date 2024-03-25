import { ClassCreaterImpl } from 'app/useCases/ClassCreater'
import { ClassCreater } from 'domain/useCases/ClassCreater'
import { AxiosClassCreaterRepo } from 'infra/libs/axios/repositories/ClassCreaterRepo'

export const makeClassCreater = (): ClassCreater => {
  const url = import.meta.env.VITE_DND_API_URL
  if (!url) {
    console.warn('[ENV] DND_API_URL not found')
  }

  const repository = new AxiosClassCreaterRepo(url)
  const classCreater = new ClassCreaterImpl(repository)

  return classCreater
}
