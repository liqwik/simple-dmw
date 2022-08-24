import React, { useEffect, useMemo, useState } from 'react';
import { AppLayout } from 'app/components/UI/Layout';
import { Card, Col, Row } from 'antd';
import { reportService } from 'services';
import DocTypeReport from './DocTypeReport';
import DateTimeUtil from 'utils/DateTimeUtil';
import DateFilter from './DateFilter';
import moment from 'moment';
import { DashboardCard } from 'app/components/Card/DashboardCard';
import { FcDocument, FcPackage, FcAnswers, FcInspection } from 'react-icons/fc';
import IconUrgentDoc from 'app/components/UI/Icon/IconUrgentDoc';
import { useTranslation } from 'react-i18next';

function DashboardPage() {
  const { t } = useTranslation();
  const [summaryData, setSummaryData] = useState<any>({ normal: '0', urgent: '0', signature: '0' });
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

      const flatSummaryData = docTypeTotal.reduce((prev, curr) => {
        prev[curr._id] = curr.totalDoc.toString();
        return prev;
      }, {});

      setSummaryData(prevState => ({ ...prevState, ...flatSummaryData }));
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

  const totalDocument = useMemo(
    () => parseInt(summaryData.normal) + parseInt(summaryData.urgent) + parseInt(summaryData.signature),
    [summaryData],
  );

  return (
    <AppLayout
      style={{
        margin: '16px',
        padding: '8px',
        background: 'transparent',
      }}
    >
      <Row gutter={[16, 16]}>
        <Col sm={12} md={6}>
          <DashboardCard title="ឯកសារសរុប" icon={<FcPackage size="2rem" />} value={totalDocument} />
        </Col>

        <Col sm={12} md={6}>
          <DashboardCard
            title={t('docStatus.normal')}
            color="#096dd9"
            icon={<FcDocument size="2rem" />}
            value={summaryData?.normal}
          />
        </Col>

        <Col sm={12} md={6}>
          <DashboardCard
            title={t('docStatus.urgent')}
            color="#cf1322"
            icon={<IconUrgentDoc />}
            value={summaryData?.urgent}
          />
        </Col>

        <Col sm={12} md={6}>
          <DashboardCard
            title="ឯកសារបានចាររួច"
            color="#389e0d"
            icon={<FcInspection size="2rem" />}
            value={summaryData?.signature}
          />
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
