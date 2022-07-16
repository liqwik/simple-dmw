import IClientHttp from 'lib/http/IClientHttp';
import { ApiRoute } from 'utils';
import BaseService from './BaseService';

class InstitutionService extends BaseService {
  constructor(http: IClientHttp) {
    super(ApiRoute.institution(), http);
  }
}

export default InstitutionService;
