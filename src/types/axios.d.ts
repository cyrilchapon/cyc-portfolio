import "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    callbackParamName?: string;
  }
}
