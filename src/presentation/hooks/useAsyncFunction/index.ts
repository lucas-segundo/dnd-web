import { useCallback, useEffect, useRef, useState } from 'react'

export function useAsyncFunction<Data>(asyncFunction: () => Promise<Data>) {
  const [data, setData] = useState<Data>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const functionRef = useRef(asyncFunction)

  const resolveFunction = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await functionRef.current()
      setData(data)
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    resolveFunction()
  }, [resolveFunction])

  return {
    data,
    isLoading,
    error,
  }
}
