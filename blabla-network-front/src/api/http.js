// @ts-ignore
import axios from "axios";
import { getToken } from "../utils/common";

const BASE_URL = process.env.REACT_APP_API_URL;

const StatusCode = {
  Unauthorized: 401,
  Forbidden: 403,
  TooManyRequests: 429,
  InternalServerError: 500,
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": true,
  "X-Requested-With": "XMLHttpRequest",
};

const injectToken = (config) => {
  try {
    const token = getToken();
    if (token != null) config.headers.Authorization = `Bearer ${token}`;

    return config;
  } catch (error) {
    throw new Error(error);
  }
};

class Http {
  instance = null;

  http() {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: BASE_URL,
      headers,
    });

    http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    this.instance = http;
    return http;
  }

  request(config) {
    return this.http().request(config);
  }

  get(url, config = null) {
    return this.http().get(url, config);
  }

  post(url, data = null, config = null) {
    return this.http().post(url, data, config);
  }

  put(url, data = null, config = null) {
    return this.http().put(url, data, config);
  }

  delete(url, config = null) {
    return this.http().delete(url, config);
  }

  handleError(error) {
    const { status } = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        break;
      }
      case StatusCode.Forbidden: {
        break;
      }
      case StatusCode.Unauthorized: {
        break;
      }
      case StatusCode.TooManyRequests: {
        break;
      }
      default:
        break;
    }

    return Promise.reject(error);
  }
}

export const http = new Http();
