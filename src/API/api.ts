import axios from 'axios'

/* Creating a new instance of axios with the baseURL and headers. */
const API = axios.create({
  baseURL: `https://api.github.com/`,
    headers: {
        'Accept': 'application/vnd.github.v3.+json',
    },
})

/**
 * Timeout returns a Promise that resolves after a given number of milliseconds.
 * @param {number} ms - The number of milliseconds to wait.
 * @returns A promise that resolves after a certain amount of time.
 */
function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* Intercepting the response and checking if the response status is 403. If it is, it waits for 60
seconds and then makes the request again. */
API.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
      if (error.response.status === 403) {
            await timeout(60000);
            return await  API.request(originalRequest) 
    }
    throw error
  }
)

export default API
