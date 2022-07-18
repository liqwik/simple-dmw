import IClientHttp from 'lib/http/IClientHttp';
import { ApiRoute } from 'utils';

class AuthService {
  private readonly http: IClientHttp;

  constructor(http: IClientHttp) {
    this.http = http;
  }

  login({ identity, password }) {
    return this.http.post(ApiRoute.login, { idtt: identity, pwd: password });
  }
}

export default AuthService;
