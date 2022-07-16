import IClientHttp from 'lib/http/IClientHttp';
import { ApiRoute } from 'utils';
import BaseService from './BaseService';

class DocumentService extends BaseService {
  constructor(http: IClientHttp) {
    super(ApiRoute.document(), http);
  }
}

export default DocumentService;
