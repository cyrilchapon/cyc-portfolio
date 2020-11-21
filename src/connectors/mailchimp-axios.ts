import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import mergeConfig from 'axios/lib/core/mergeConfig'
import axiosJsonpAdapter from 'axios-jsonp'
import { browserEnv } from '$env'
import buildFullPath from 'axios/lib/core/buildFullPath'

type MailchimpSubscribeStatus =
  | 'success'
  | 'error'

interface RawMailchimpSubscribeResponse {
  result: MailchimpSubscribeStatus,
  msg: string
}

export interface MailchimpSubscribeResponse {
  result: 'success',
  message: string
}

export class MailchimpError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'MailchimpError'
  }
}

const rawResponseToResponse = (rawResponse: AxiosResponse<RawMailchimpSubscribeResponse>): AxiosResponse<MailchimpSubscribeResponse> => {
  if (
    rawResponse.data && (
      rawResponse.data.result === 'success' ||
      rawResponse.data.msg.includes('already subscribed')
    )
  ) {
    return {
      ...rawResponse,
      data: {
        result: 'success',
        message: rawResponse.data.msg
      }
    }
  } else {
    throw new MailchimpError(rawResponse.data?.msg)
  }
}

interface MailChimpSubscribeData {
  email: string
  firstname?: string | null
  lastname?: string | null
}

const formatMailchimpSubscribeData = (data: MailChimpSubscribeData) => ({
  EMAIL: data.email,
  ...(data.firstname != null ? { FNAME: data.firstname } : null),
  ...(data.lastname != null ? { LNAME: data.lastname } : null)
})

interface MailchimpAxiosMethods {
  subscribe: (this: AxiosInstance, data: MailChimpSubscribeData, config?: AxiosRequestConfig) => Promise<AxiosResponse<MailchimpSubscribeResponse>>
}

export interface MailchimpAxiosInstance extends AxiosInstance, MailchimpAxiosMethods {}

const baseAxios = Axios.create({
  baseURL: `https://${browserEnv.NEXT_PUBLIC_MAILCHIMP_HOST}`,
  adapter: axiosJsonpAdapter
})

export const mailchimpAxios: MailchimpAxiosInstance = Object.assign<
  {},
  AxiosInstance,
  MailchimpAxiosMethods
>({}, baseAxios, {
  subscribe: async function (data, config) {
    const _config = mergeConfig(this.defaults, config ?? {})
    console.log(data)

    const response = await this.get<RawMailchimpSubscribeResponse>(
      // That crap adapter doesn't respect baseURL config
      buildFullPath(_config.baseURL, '/subscribe/post-json'),
      {
        ...config,
        params: {
          ...config?.params,
          u: browserEnv.NEXT_PUBLIC_MAILCHIMP_USER_ID,
          id: browserEnv.NEXT_PUBLIC_MAILCHIMP_FORM_ID,
          ...formatMailchimpSubscribeData(data)
        },
        callbackParamName: 'c'
      }
    )

    return rawResponseToResponse(response)
  }
})

export default mailchimpAxios
