import IClientHttp from 'lib/http/IClientHttp';
import { ApiRoute } from 'utils';
import BaseService from './BaseService';

class InternalUserService extends BaseService {
  constructor(http: IClientHttp) {
    super(ApiRoute.internalUser(), http);
  }
}

export default InternalUserService;
