import { serverEnv } from '$env/server'
import Axios, { AxiosInstance } from 'axios'
import querystring from 'querystring'

export const turnstileAxios = Axios.create({
  baseURL: 'https://challenges.cloudflare.com/turnstile/v0',
})

export type TurnstileVerifyRequestBody = {
  secret: string
  response: string
  remoteip?: string
}

export type TurnstileVerifyErrorCode =
  | 'missing-input-secret'
  | 'invalid-input-secret'
  | 'missing-input-response'
  | 'invalid-input-response'
  | 'bad-request'
  | 'timeout-or-duplicate'

export type TurnstileVerifyResponseBodyOK = {
  success: true
  challenge_ts: string
  hostname: string
  action: string
}

export type TurnstileVerifyResponseBodyError = {
  success: false
  'error-codes': TurnstileVerifyErrorCode[]
}

export type TurnstileVerifyResponseBody =
  | TurnstileVerifyResponseBodyOK
  | TurnstileVerifyResponseBodyError

export const _verifyTurnstile =
  (axios: AxiosInstance = turnstileAxios) =>
  (recaptchaSecret: string) =>
  async (recaptchaChallenge: string) => {
    const input: TurnstileVerifyRequestBody = {
      secret: recaptchaSecret,
      response: recaptchaChallenge,
    }

    const { data: output } = await axios.post<TurnstileVerifyResponseBody>(
      '/siteverify',
      querystring.stringify(input),
    )
    return output
  }

export const verifyTurnstile =
  (axios: AxiosInstance = turnstileAxios) =>
  async (recaptchaChallenge: string) =>
    _verifyTurnstile(axios)(serverEnv.TURNSTILE_PRIVATE_KEY)(
      recaptchaChallenge,
    )

