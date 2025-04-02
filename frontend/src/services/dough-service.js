import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/dough";

class DoughService extends HttpClient {
  async getDough(id) {
    try {
      return await this.get(`/${id}`);
    } catch (e) {
      throw Error(e);
    }
  }
}

export default new DoughService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
