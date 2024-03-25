import { Mock, describe, expect, it, vi } from 'vitest'
import { AxiosClassCreaterRepo } from '.'
import { faker } from '@faker-js/faker'
import axios, { AxiosResponse } from 'axios'
import { mockClassCreaterParams } from 'domain/useCases/ClassCreater/mock'
import { adaptRemoteClass } from 'infra/adapters/adaptRemoteClass'
import { mockRemoteClass } from 'infra/data/RemoteClass/mock'
import { RemoteClass } from 'infra/data/RemoteClass'

vi.mock('axios')

const makeSUT = () => {
  const url = faker.internet.url()
  const sut = new AxiosClassCreaterRepo(url)

  const mockedPost = axios.post as Mock

  const axiosResponse: Partial<AxiosResponse> = {
    data: mockRemoteClass(),
    status: 201,
  }
  mockedPost.mockResolvedValue(axiosResponse)

  return { sut, url, mockedPost }
}

describe('AxiosClassCreaterRepo', () => {
  it('should call axios with right params', async () => {
    const { sut, url, mockedPost } = makeSUT()

    const params = mockClassCreaterParams()
    await sut.create(params)

    expect(mockedPost).toBeCalledWith(url + '/classes', params)
  })

  it('should return the created class', async () => {
    const { sut, mockedPost } = makeSUT()

    const params = mockClassCreaterParams()
    const remoteClass: RemoteClass = {
      data: { ...params, id: faker.string.uuid() },
    }
    const axiosResponse: Partial<AxiosResponse> = {
      data: remoteClass,
      status: 201,
    }
    mockedPost.mockResolvedValue(axiosResponse)

    const expectedClass = adaptRemoteClass(axiosResponse.data)

    const result = await sut.create(params)
    expect(result).toEqual(expectedClass)
  })

  it('should throw error if axios throws', async () => {
    const { sut, mockedPost } = makeSUT()

    const params = mockClassCreaterParams()
    const error = new Error('axios error')
    mockedPost.mockRejectedValue(error)

    await expect(sut.create(params)).rejects.toThrowError(error)
  })
})
