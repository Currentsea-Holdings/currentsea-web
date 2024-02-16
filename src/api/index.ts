import axios, { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosParams = {
  baseURL: 'http://localhost:3000/',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
};

export const mock = new MockAdapter(axios);

const axiosInstance = axios.create(axiosParams);

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