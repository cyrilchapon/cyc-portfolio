import Axios, { AxiosInstance } from 'axios'
import { ContactRequestBody } from 'pages/api/contact'

export const apiAxios = Axios.create({
  baseURL: '/api',
})

export const postContact =
  (axios: AxiosInstance = apiAxios) =>
  async (input: ContactRequestBody) => {
    const { data: output } = await axios.post('/contact', input)
    return output
  }
