import IClientHttp from 'lib/http/IClientHttp';
import { ApiRoute } from 'utils';
import BaseService from './BaseService';

class CategoryService extends BaseService {
  constructor(http: IClientHttp) {
    super(ApiRoute.category(), http);
  }
}

export default CategoryService;
