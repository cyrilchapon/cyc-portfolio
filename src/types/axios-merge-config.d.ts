declare module 'axios/lib/core/mergeConfig' {
  import { AxiosRequestConfig } from 'axios'

  const mergeConfig: (config1: AxiosRequestConfig, config2: AxiosRequestConfig) => AxiosRequestConfig
  export default mergeConfig
}
