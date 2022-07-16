import IClientHttp from 'lib/http/IClientHttp';
import { ApiRoute } from 'utils';
import BaseService from './BaseService';

class UserService extends BaseService {
  constructor(http: IClientHttp) {
    super(ApiRoute.user(), http);
  }
}

export default UserService;
