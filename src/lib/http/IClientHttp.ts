export default interface IClientHttp {
  get(url, config?);

  post(url, data, config?);

  put(url, data, config?);

  delete(url, config?);
}
