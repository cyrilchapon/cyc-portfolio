declare module "axios-jsonp" {
  import { AxiosAdapter } from "axios";
  interface JsonpAxiosAdapter extends AxiosAdapter {}
  const jsonpAdapter: JsonpAxiosAdapter;
  export default jsonpAdapter;
}
