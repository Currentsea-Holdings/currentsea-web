import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const mock = new MockAdapter(axios);

const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: import.meta.env.TIMEOUT,
  headers: import.meta.env.HEADERS,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    console.error(err.message);
    const res = err.response;
    if (res && res.status == 404) {
      window.location.href = `${import.meta.env.BASE_URL}/login`;
    }
    console.error('API Error Status:', res?.status, 'Data:', res?.data);
    return Promise.reject(err);
  },
);

export const api = {
  get: <T>(url: string, config: AxiosRequestConfig = {}) => axiosInstance.get<T>(url, config),
  delete: <T>(url: string, config: AxiosRequestConfig = {}) => axiosInstance.delete<T>(url, config),
  post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
    axiosInstance.post<T>(url, body, config),
  patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
    axiosInstance.patch<T>(url, body, config),
  put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
    axiosInstance.put<T>(url, body, config),
};
