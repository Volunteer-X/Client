import axios, { AxiosInstance } from 'axios';

class FileHandlerApi {
  public client: AxiosInstance;

  private static instance: FileHandlerApi;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://192.168.1.222:3550/api/v1/',
    });
  }

  public setToken(token: string) {
    this.client.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
  }

  public static getInstance() {
    if (!FileHandlerApi.instance) {
      FileHandlerApi.instance = new FileHandlerApi();
    }

    return FileHandlerApi.instance;
  }
}

export default FileHandlerApi;
