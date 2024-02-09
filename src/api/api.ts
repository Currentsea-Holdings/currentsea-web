import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosParams = {
  baseURL: 'http://localhost:3000/',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
};

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