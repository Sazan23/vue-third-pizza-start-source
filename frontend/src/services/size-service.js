import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/size";

class SizeService extends HttpClient {
  async getSize(id) {
    try {
      return await this.get(`/${id}`);
    } catch (e) {
      throw Error(e);
    }
  }
}

export default new SizeService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
