import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/ingredient";

class IngredientService extends HttpClient {
  async getIngredient(id) {
    try {
      return await this.get(`/${id}`);
    } catch (e) {
      throw Error(e);
    }
  }
}

export default new IngredientService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
