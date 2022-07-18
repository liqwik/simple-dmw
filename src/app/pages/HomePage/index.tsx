import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Space, Card } from 'antd';
import Text from 'antd/lib/typography/Text';
import { Logo } from 'app/components/UI/Icon/Logo';
import { translations } from 'locales/translations';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import clientHttp from 'lib/http/axios';
import HomeList from './List';
import DocumentDetail from 'app/pages/DocumentPage/components/Detail';
import SearchFilterBar from './SearchFilterBar';
import { APIBase } from 'config';
import { getQueryParams, hasFieldFilter, queryStringToFieldFilter } from 'utils/http';
import { useLocation } from 'react-router-dom';
import { ITEM_LIMIT } from 'utils/constants';
import useQueryString from 'hooks/useQueryString';
import moment from 'moment';
import ObjectUtil from 'utils/ObjectUtil';

const { Header, Content } = Layout;

export function HomePage() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [itemDetail, setItemDetail] = useState(null);

  const location = useLocation();

  const [updateUriQuery] = useQueryString({ appRoute: '/' });

  const qs = getQueryParams(location.search);
  const [filterQuery, setFilterQuery] = useState<any>({
    q: qs.get('search') || '',
    fq: qs.get('fq') || '',
    sb: qs.get('sort') || '',
    limit: qs.get('limit') || ITEM_LIMIT,
    page: qs.get('page') || 1,
  });

  useEffect(() => {
    const { q, fq } = filterQuery;

    const fetchDocuments = async () => {
      setIsLoading(true);

      const result = await clientHttp(`${APIBase}/v1`).get('/documents', {
        params: ObjectUtil.cleanObjectValue(filterQuery),
      });
      const resultCount = await clientHttp(`${APIBase}/v1`).get('/documents/c', {
        params: ObjectUtil.cleanObjectValue({ q, fq }),
      });

      setItems(result);
      setTotalItem(resultCount.total);
      setIsLoading(false);
    };

    fetchDocuments();
  }, [filterQuery]);

  const handleResetFilter = () => {
    const qs = {
      ...filterQuery,
      q: '',
      fq: '',
      sb: '',
      limit: ITEM_LIMIT,
      page: 1,
    };

    setFilterQuery(qs);
    updateUriQuery(qs);
  };

  const handleSearch = value => {
    setFilterQuery({ ...filterQuery, q: value, page: 1 });
    updateUriQuery({ ...filterQuery, q: value, page: 1 });
  };

  const handlePageChange = (pagination, filter, sorter) => {
    const { pageSize: limit, current: page } = pagination;
    let qs = { ...filterQuery, limit, page };

    if (sorter && sorter.field && sorter.order) {
      const order = sorter.order === 'descend' ? '-' : '';
      qs = { ...qs, sb: `${order}${sorter.field}` };
    } else {
      qs = { ...qs, sb: '' };
    }

    if (hasFieldFilter(filter)) {
      const fieldFilter = queryStringToFieldFilter(filter);
      qs = { ...qs, fq: fieldFilter };
    }

    setFilterQuery(qs);
    updateUriQuery(qs);
  };

  const handleCloseDetail = () => {
    setItemDetail(null);
  };

  const handleViewDetail = item => {
    setItemDetail(item);
  };

  const handleFilter = values => {
    if (hasFieldFilter(values)) {
      if (values.docDateRange) {
        values['docStart'] = moment(values.docDateRange[0]).startOf('day').unix();
        values['docEnd'] = moment(values.docDateRange[1]).endOf('day').unix();

        delete values.docDateRange;
      } else {
        values['docStart'] = '';
        values['docEnd'] = '';
      }

      setFilterQuery({ ...filterQuery, ...values });
    }
  };

  return (
    <>
      <Helmet>
        <title>លិខិតចេញ-ចូល</title>
        <meta name="description" content={t(translations.appName)} />
      </Helmet>

      <Layout>
        <Header
          style={{
            background: '#fff',
            zIndex: 1,
            width: '100%',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            padding: '0 24px',
          }}
        >
          <Space>
            <Logo width="36px" />
            <Text strong>{t(translations.appName)}</Text>
          </Space>
        </Header>

        <Content style={{ padding: '16px' }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card bordered={false}>
                <SearchFilterBar
                  showReset={filterQuery.q || filterQuery.sb || filterQuery.fq}
                  value={filterQuery.q}
                  onReset={handleResetFilter}
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                />
              </Card>
            </Col>

            <Col span={24}>
              <Card bordered={false}>
                <HomeList
                  items={items}
                  loading={isLoading}
                  pagination={{
                    total: totalItem,
                    pageSize: filterQuery.limit * 1,
                    current: filterQuery.page * 1,
                  }}
                  onViewDetail={handleViewDetail}
                  onPageChange={handlePageChange}
                />
              </Card>
            </Col>
          </Row>
        </Content>

        <DocumentDetail item={itemDetail} visible={!!itemDetail} onClose={handleCloseDetail} />
      </Layout>
    </>
  );
}
