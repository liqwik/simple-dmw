import IClientHttp from 'lib/http/IClientHttp';
import { ApiRoute } from 'utils';
import BaseService from './BaseService';

class DocTypeService extends BaseService {
  constructor(http: IClientHttp) {
    super(ApiRoute.docType(), http);
  }
}

export default DocTypeService;
