import { faker } from '@faker-js/faker'
import { act, renderHook } from '@testing-library/react'
import { useLazyAsyncFunction } from '.'
import { describe, expect, it, vi } from 'vitest'

describe('useLazyAsyncFunction', () => {
  it('should call the async function', async () => {
    const asyncFunction = vi.fn()
    const params = {
      name: faker.person.firstName(),
    }

    const { result } = renderHook(() => useLazyAsyncFunction())
    await act(async () => {
      await result.current.resolveFunction(() => asyncFunction(params))
    })

    expect(asyncFunction).toBeCalledWith(params)
  })

  it('should return the right data after calling the async function', async () => {
    const asyncFunction = vi.fn()
    const data = faker.database.column()
    asyncFunction.mockReturnValue(data)

    const { result } = renderHook(() => useLazyAsyncFunction())
    await act(async () => {
      await result.current.resolveFunction(() =>
        asyncFunction(faker.database.column()),
      )
    })

    expect(result.current.data).toBe(data)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('should return the right data while loading', async () => {
    const asyncFunction = vi.fn()
    const { result } = renderHook(() => useLazyAsyncFunction())

    act(() => {
      result.current.resolveFunction(() =>
        asyncFunction(faker.database.column()),
      )
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(null)
  })

  it('should return the right data if an error happenned', async () => {
    const asyncFunction = vi.fn()
    const error = new Error(faker.lorem.words())
    asyncFunction.mockRejectedValue(error)

    const { result } = renderHook(() => useLazyAsyncFunction())
    await act(async () => {
      await result.current.resolveFunction(() =>
        asyncFunction(faker.database.column()),
      )
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(error)
  })
})
