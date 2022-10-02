import IClientHttp from 'lib/http/IClientHttp';
import { ApiRoute } from 'utils';

class ReportService {
  http: IClientHttp;

  constructor(http: IClientHttp) {
    this.http = http;
  }

  async getTotalDocByStatus(startDate, endDate) {
    const data = await this.http.get(`${ApiRoute.report()}/docs/status`, {
      params: { start: startDate, end: endDate },
    });

    const result = data.reduce(
      (prev, cur) => {
        const { _id, totalDoc } = cur;
        prev.totalDoc += totalDoc;

        if (_id.docStatus === 'normal') {
          prev.totalNormal += cur.totalDoc;
        }
        if (_id.docStatus === 'urgent') {
          prev.totalUrgent += cur.totalDoc;
        }

        if (_id.sign) {
          prev.totalSigned += cur.totalDoc;
        }

        if (!_id.sign) {
          prev.totalUnsign += cur.totalDoc;
        }

        return prev;
      },
      {
        totalDoc: 0,
        totalNormal: 0,
        totalUrgent: 0,
        totalSigned: 0,
        totalUnsign: 0,
      },
    );

    return result;
  }

  async getTotalDocByDocType(startDate, endDate) {
    return this.http.get(`${ApiRoute.report()}/docs/doc-type`, {
      params: { start: startDate, end: endDate },
    });
  }
}

export default ReportService;
