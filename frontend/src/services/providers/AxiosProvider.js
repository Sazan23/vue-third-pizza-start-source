import axios from "axios";

export default class AxiosProvider {
  interceptors = []
  computeQueryParams(query) {
    if (!query) return ''
    const queryParams = new URLSearchParams(query)
    return '?' + queryParams.toString()
  }

  request(options) {
    const headers = options.headers || {}
    const method = options.method || 'GET'
    const body = options.data ? JSON.stringify(options.data) : null

    return axios({
      ...options,
      method,
      data: body,
      headers,
    })
      .then(response => {
        if (response.status < 200) {
          return Promise.reject(response)
        }
        return response
      })
      .then(response => {
        return response.data
      })
      .catch(async (error) => {
        const message = await this.onError(error)
        throw new Error(message)
      })
  }

  addInterceptor(interceptor) {
    if (!interceptor || !interceptor.onError) {
      throw new Error('Unsupported interceptor')
    }
    this.interceptors.push(interceptor)
  }

  async onError(response) {
    try {
      await Promise.all(
        this.interceptors.map(interceptor => {
          if (interceptor && interceptor.onError) {
            return interceptor.onError(response.status, response.data.message);
          }
          return null;
        })
      );
      throw new Error(response.data.message || `${response.status}: ${response.data.message}`);
    } catch {
      throw new Error('Error handling failed');
    }
  }

  get(path, options) {
    return this.request({ path, method: 'GET', ...options })
  }

  post(path, options) {
    return this.request({ path, method: 'POST', ...options })
  }

  put(path, options) {
    return this.request({ path, method: 'PUT', ...options })
  }

  delete(path, options) {
    return this.request({ path, method: 'DELETE', ...options })
  }
}
