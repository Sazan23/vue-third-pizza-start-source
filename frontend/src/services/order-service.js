import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/orders";

class OrderService extends HttpClient {
  async createOrder(address) {
    try {
      return await this.post("/", address);
    } catch (e) {
      throw Error(e);
    }
  }

  async getOrder(id) {
    try {
      return await this.get(`/${id}`);
    } catch (e) {
      throw Error(e);
    }
  }

  async updateOrder(address, id) {
    try {
      return await this.put(`/${id}`, address);
    } catch (e) {
      throw Error(e);
    }
  }

  async deleteOrder(id) {
    try {
      await this.delete(`/${id}`);
    } catch (e) {
      throw Error(e);
    }
  }
}

export default new OrderService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
