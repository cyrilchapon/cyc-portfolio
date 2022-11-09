import { serverEnv } from '$env/server'
import Axios, { AxiosInstance } from 'axios'
import querystring from 'querystring'

export const recaptchaVerifyAxios = Axios.create({
  baseURL: 'https://www.google.com/recaptcha/api',
})

export type RecaptchaVerifyRequestBody = {
  secret: string
  response: string
  remoteip?: string
}

export type RecaptchaVerifyErrorCode =
  | 'missing-input-secret'
  | 'invalid-input-secret'
  | 'missing-input-response'
  | 'invalid-input-response'
  | 'bad-request'
  | 'timeout-or-duplicate'

export type RecaptchaVerifyResponseBodyOK = {
  success: true
  challenge_ts: string
  hostname: string
  action: string
}

export type RecaptchaVerifyResponseBodyError = {
  success: false
  'error-codes': RecaptchaVerifyErrorCode[]
}

export type RecaptchaVerifyResponseBody =
  | RecaptchaVerifyResponseBodyOK
  | RecaptchaVerifyResponseBodyError

export const verifyRecaptcha =
  (axios: AxiosInstance = recaptchaVerifyAxios) =>
  (recaptchaSecret: string) =>
  async (recaptchaChallenge: string) => {
    const input: RecaptchaVerifyRequestBody = {
      secret: recaptchaSecret,
      response: recaptchaChallenge,
    }

    const { data: output } = await axios.post<RecaptchaVerifyResponseBody>(
      '/siteverify',
      querystring.stringify(input),
    )
    return output
  }

export const verifyRecaptchaV3 =
  (axios: AxiosInstance = recaptchaVerifyAxios) =>
  async (recaptchaChallenge: string) =>
    verifyRecaptcha(axios)(serverEnv.RECAPTCHA_V3_PRIVATE_KEY)(
      recaptchaChallenge,
    )

export const verifyRecaptchaV2 =
  (axios: AxiosInstance = recaptchaVerifyAxios) =>
  async (recaptchaChallenge: string) =>
    verifyRecaptcha(axios)(serverEnv.RECAPTCHA_V2_PRIVATE_KEY)(
      recaptchaChallenge,
    )
