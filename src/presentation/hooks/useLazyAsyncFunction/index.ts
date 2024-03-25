/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react'

export function useLazyAsyncFunction<Data>() {
  const [data, setData] = useState<Data | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown | null>(null)

  const resolveFunction = useCallback(
    async (asyncFunction: () => Promise<Data>) => {
      try {
        setIsLoading(true)

        const data = await asyncFunction()
        setData(data)
      } catch (error) {
        console.error(error)
        setError(error)
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  return {
    data,
    isLoading,
    error,
    resolveFunction,
  }
}
