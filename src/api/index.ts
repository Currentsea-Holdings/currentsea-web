import axios, { AxiosRequestConfig, AxiosError, AxiosResponse, Method } from 'axios';
import { BASE_API_URL, TIMEOUT, HEADERS } from '@/utils/constants';
// import MockAdapter from 'axios-mock-adapter';

// export const mock = new MockAdapter(axios);

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: TIMEOUT,
  headers: HEADERS,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    console.error(err.message);
    const res = err.response;
    if (res && res.status == 404) {
      window.location.href = `${import.meta.env.VITE_BASE_URL}/login`;
    }
    console.error('API Error Status:', res?.status, 'Data:', res?.data);
    return Promise.reject(err);
  },
);

interface HTTPRequestOptions {
  url: string;
  method: Method;
  payload?: object;
  params?: AxiosRequestConfig['params'];
}

const invoke = async <T>({
  url,
  method,
  payload: data,
  params,
}: HTTPRequestOptions): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance({
      method,
      url,
      data,
      params,
    });
    return response.data;
  } catch (err) {
    let errorMessage = 'An unexpected error occurred.';
    if (axios.isCancel(err)) {
      errorMessage = 'Request was cancelled.';
    } else if (err instanceof AxiosError) {
      if (err.response) {
        errorMessage = `Request failed with status ${err.response.status}: ${err.response.data}`;
      } else if (err.request) {
        errorMessage = 'No response was received for the request.';
      } else {
        errorMessage = err.message;
      }
    }
    throw new Error(errorMessage);
  }
};

interface Api {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  post: <T>(url: string, body?: object, config?: AxiosRequestConfig) => Promise<T>;
  put: <T>(url: string, body?: object, config?: AxiosRequestConfig) => Promise<T>;
  patch: <T>(url: string, body?: object, config?: AxiosRequestConfig) => Promise<T>;
  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
}

export const api: Api = {
  get: <T>(url: string, config: AxiosRequestConfig = {}) => {
    const requestConfig: HTTPRequestOptions = {
      url: url,
      method: 'get',
      payload: undefined,
      params: config.params,
    };
    return invoke<T>(requestConfig);
  },
  post: <T>(url: string, body: object = {}, config: AxiosRequestConfig = {}) => {
    const requestConfig: HTTPRequestOptions = {
      url: url,
      method: 'post',
      payload: body,
      params: config.params,
    };
    return invoke<T>(requestConfig);
  },
  put: <T>(url: string, body: object = {}, config: AxiosRequestConfig = {}) => {
    const requestConfig: HTTPRequestOptions = {
      url: url,
      method: 'put',
      payload: body,
      params: config.params,
    };
    return invoke<T>(requestConfig);
  },
  patch: <T>(url: string, body: object = {}, config: AxiosRequestConfig = {}) => {
    const requestConfig: HTTPRequestOptions = {
      url: url,
      method: 'patch',
      payload: body,
      params: config.params,
    };
    return invoke<T>(requestConfig);
  },
  delete: <T>(url: string, config: AxiosRequestConfig = {}) => {
    const requestConfig: HTTPRequestOptions = {
      url: url,
      method: 'delete',
      payload: undefined,
      params: config.params,
    };
    return invoke<T>(requestConfig);
  },
};
