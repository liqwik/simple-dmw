import React, { useEffect, useState } from 'react';
import { AppLayout } from 'app/components/UI/Layout';
import { Card, Col, Row, Statistic } from 'antd';
import { reportService } from 'services';
import DocTypeReport from './DocTypeReport';
import DateTimeUtil from 'utils/DateTimeUtil';
import DateFilter from './DateFilter';
import moment from 'moment';

function DashboardPage() {
  const [summaryData, setSummaryData] = useState<any>(null);
  const [docTypeReport, setDocTypeReport] = useState<any>(null);
  const [dateFilter, setDateFilter] = useState<any>({
    start: moment().startOf('month'),
    end: moment().endOf('month'),
  });

  useEffect(() => {
    const fetchCountDocType = async () => {
      const docTypeTotal = await reportService.getTotalDocByStatus(
        DateTimeUtil.qsFormat(dateFilter.start.format('YYYY-MM-DD')),
        DateTimeUtil.qsFormat(dateFilter.end.format('YYYY-MM-DD')),
      );

      setSummaryData(
        docTypeTotal.reduce((prev, curr) => {
          prev[curr._id] = curr.totalDoc;

          return prev;
        }, {}),
      );
    };

    fetchCountDocType();
  }, [dateFilter]);

  useEffect(() => {
    const fetchCountDocType = async () => {
      const docTypeTotal = await reportService.getTotalDocByDocType(
        DateTimeUtil.qsFormat(dateFilter.start.format('YYYY-MM-DD')),
        DateTimeUtil.qsFormat(dateFilter.end.format('YYYY-MM-DD')),
      );

      setDocTypeReport(docTypeTotal);
    };

    fetchCountDocType();
  }, [dateFilter]);

  const handleSelectDate = (date, _dateString) => {
    setDateFilter({
      start: date[0],
      end: date[1],
    });
  };

  return (
    <AppLayout
      style={{
        margin: '16px',
        padding: '8px',
        background: 'transparent',
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic title="ឯកសារធម្មតា" value={summaryData?.normal} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="ប្រញាប់ ឬ ជិតដល់ថ្ងៃកំណត់" value={summaryData?.urgent} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="ឯកសារបានចាររួច" value={summaryData?.signature} />
          </Card>
        </Col>

        <Col span={24}>
          <Card
            title={`របាយការណ៍សរុប ចាប់ពី ${dateFilter.start.format('DD/MM/YYYY')} ដល់ ${dateFilter.end.format(
              'DD/MM/YYYY',
            )}`}
            extra={
              <>
                <DateFilter onChange={handleSelectDate} />
              </>
            }
          >
            <DocTypeReport data={docTypeReport} />
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
}

export default DashboardPage;
