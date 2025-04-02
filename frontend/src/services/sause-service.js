import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/sauces";

class SauceService extends HttpClient {
  async getSauce(id) {
    try {
      return await this.get(`/${id}`);
    } catch (e) {
      throw Error(e);
    }
  }
}

export default new SauceService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
