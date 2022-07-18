import { ITEM_LIMIT } from 'utils/constants';

class BaseService {
  private readonly route: string;
  private readonly http: any;

  constructor(route, http) {
    this.route = route;
    this.http = http;
  }

  httpInstance() {
    return this.http;
  }

  getAll(params?: any) {
    try {
      return this.http.get(this.route, {
        params: {
          limit: ITEM_LIMIT,
          sb: '-createdAt',
          ...params,
        },
      });
    } catch (err: any) {
      return err;
    }
  }

  async count(params) {
    return await this.http.get(`${this.route}/c`, { params });
  }

  async getDetail(id) {
    return await this.http.get(`${this.route}/${id}`);
  }

  async create(data) {
    return await this.http.post(this.route, data);
  }

  async update(id, data) {
    return await this.http.put(`${this.route}/${id}`, data);
  }

  async delete(id) {
    return await this.http.delete(`${this.route}/${id}`);
  }
}

export default BaseService;
