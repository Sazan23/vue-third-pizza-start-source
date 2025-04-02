import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/addresses";

class AddressService extends HttpClient {
  async createAddress(address) {
    try {
      return await this.post("/", address);
    } catch (e) {
      throw Error(e);
    }
  }

  async getAddress(id) {
    try {
      return await this.get(`/${id}`);
    } catch (e) {
      throw Error(e);
    }
  }

  async updateAddress(address, id) {
    try {
      return await this.put(`/${id}`, address);
    } catch (e) {
      throw Error(e);
    }
  }

  async deleteAddress(id) {
    try {
      await this.delete(`/${id}`);
    } catch (e) {
      throw Error(e);
    }
  }
}

export default new AddressService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
