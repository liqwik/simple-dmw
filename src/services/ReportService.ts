import IClientHttp from 'lib/http/IClientHttp';
import { ApiRoute } from 'utils';

class ReportService {
  http: IClientHttp;

  constructor(http: IClientHttp) {
    this.http = http;
  }

  async getTotalDocByStatus(startDate, endDate) {
    try {
      return this.http.get(`${ApiRoute.report()}/docs/status`, {
        params: { start: startDate, end: endDate },
      });
    } catch (err) {
      throw err;
    }
  }

  async getTotalDocByDocType(startDate, endDate) {
    try {
      return this.http.get(`${ApiRoute.report()}/docs/doc-type`, {
        params: { start: startDate, end: endDate },
      });
    } catch (err) {
      throw err;
    }
  }
}

export default ReportService;
