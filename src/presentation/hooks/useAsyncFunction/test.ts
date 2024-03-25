import { faker } from '@faker-js/faker'
import { act, renderHook } from '@testing-library/react'
import { useAsyncFunction } from '.'
import { describe, expect, it, vi } from 'vitest'

describe('useAsyncFunction', () => {
  it('should call the async function', async () => {
    const asyncFunction = vi.fn()

    await act(async () => {
      renderHook(() => useAsyncFunction(() => asyncFunction()))
    })

    expect(asyncFunction).toBeCalled()
  })

  it('should return the right data after calling the async function', async () => {
    const asyncFunction = vi.fn()
    const data = faker.database.column()
    asyncFunction.mockReturnValue(data)

    const result = await act(async () => {
      const { result } = renderHook(() =>
        useAsyncFunction(() => asyncFunction()),
      )

      return result
    })

    expect(result.current.data).toBe(data)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('should return the right data while loading', async () => {
    const asyncFunction = function waitOneSecond(): Promise<void> {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000)
      })
    }

    const { result } = renderHook(() => useAsyncFunction(() => asyncFunction()))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(null)
  })

  it('should return the right data if an error happenned', async () => {
    const asyncFunction = vi.fn()

    const error = new Error(faker.lorem.words())
    asyncFunction.mockRejectedValue(error)

    const result = await act(() => {
      const { result } = renderHook(() =>
        useAsyncFunction(async () => await asyncFunction()),
      )

      return result
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(error.message)
  })
})
