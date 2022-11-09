import Axios, { AxiosInstance } from 'axios'
import { ContactRequestBody, ContactRequestHeaders } from 'pages/api/contact'

export const apiAxios = Axios.create({
  baseURL: '/api',
})

export const postContact =
  (axios: AxiosInstance = apiAxios) =>
  async (input: ContactRequestBody & { captcha: string }) => {
    const { captcha, ..._inputBody } = input

    const inputBody: ContactRequestBody = _inputBody
    const inputHeaders: ContactRequestHeaders = { 'x-turnstile': captcha }

    const { data: output } = await axios.post('/contact', inputBody, {
      headers: inputHeaders,
    })
    return output
  }
