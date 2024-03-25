import { Class as ClassModel } from 'domain/entities/Class'
import { ClassCreater } from 'domain/useCases/ClassCreater'
import { Button } from 'presentation/atoms/Button'
import { TextField } from 'presentation/atoms/TextField'
import { useLazyAsyncFunction } from 'presentation/hooks/useLazyAsyncFunction'
import { useState } from 'react'

export interface ClassProps {
  classCreater: ClassCreater
}

export const Class = ({ classCreater }: ClassProps) => {
  const [nameState, setNameState] = useState('')
  const { resolveFunction, isLoading, data } =
    useLazyAsyncFunction<ClassModel>()

  const handleCreate = async () => {
    await resolveFunction(() => classCreater.create({ name: nameState }))
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl mb-5">Class Creation</h1>
      <TextField
        onChange={(event) => setNameState(event.target.value)}
        data-testid="name-input"
        label="Name"
        value={nameState}
      />
      {data && <span>{data.name} class created!</span>}
      <Button
        onClick={() => handleCreate()}
        data-testid="create-button"
        className="mt-4"
        isLoading={isLoading}
      >
        Create
      </Button>
    </div>
  )
}
