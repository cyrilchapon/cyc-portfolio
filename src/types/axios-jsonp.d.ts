declare module 'axios-jsonp' {
  import { AxiosAdapter } from 'axios'
  type JsonpAxiosAdapter = AxiosAdapter
  const jsonpAdapter: JsonpAxiosAdapter
  export default jsonpAdapter
}
