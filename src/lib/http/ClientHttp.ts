import AbsClientHttp from './AbsClientHttp';
import { AxiosRequestConfig } from 'axios';
import { APIBaseAdmin } from 'config';
import { AppStorage } from 'utils';
import IClientHttp from './IClientHttp';

class ClientHttp extends AbsClientHttp implements IClientHttp {
  private static _instance: ClientHttp;

  constructor() {
    super(APIBaseAdmin);

    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this._handleRequest);
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    const token = AppStorage.getUserToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };

  public static getInstance() {
    if (!this._instance) {
      this._instance = new ClientHttp();
    }

    return this._instance;
  }

  public get(url, config) {
    return this.instance.get(url, config);
  }

  public post(url, data, config) {
    return this.instance.post(url, data, config);
  }

  public put(url, data, config) {
    return this.instance.put(url, data, config);
  }

  public delete(url, config) {
    return this.instance.delete(url, config);
  }
}

export default ClientHttp;
