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
    } catch (err) {
      return err;
    }
  }

  async count(params) {
    try {
      return await this.http.get(`${this.route}/c`, { params });
    } catch (err) {
      throw err;
    }
  }

  async getDetail(id) {
    try {
      return await this.http.get(`${this.route}/${id}`);
    } catch (err) {
      throw err;
    }
  }

  async create(data) {
    try {
      return await this.http.post(this.route, data);
    } catch (err) {
      throw err;
    }
  }

  async update(id, data) {
    return await this.http.put(`${this.route}/${id}`, data);
  }

  async delete(id) {
    return await this.http.delete(`${this.route}/${id}`);
  }
}

export default BaseService;
