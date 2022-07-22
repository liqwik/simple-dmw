import React, { useState, useEffect } from 'react';
import { Card, Col, Pagination, Radio, Row } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import AppRoute from 'utils/AppRoute';
import { ITEM_LIMIT, listViewMode } from 'utils/constants';
import SearchFilterBar from './SearchFilterBar';
import BaseCRUDWrapper from '../App/BaseCRUDWrapper';
import useQueryString from 'hooks/useQueryString';
import { getQueryParams, hasFieldFilter, queryStringToFieldFilter } from 'utils/http';
import { DocumentList } from './List';
import { selectDocument } from './slice/selectors';
import { useDocumentSlice } from './slice';
import { Link, useRouteMatch } from 'react-router-dom';
import DocumentDetail from './components/Detail';
import moment from 'moment';
import DocCardList from './DocCardList';
import printJS from 'print-js';
import ToggleViewMode from './components/ToggleViewMode';
import { AppStorage } from 'utils';

interface Props {
  location?: any;
}

export function DocumentPage({ location }: Props) {
  const dispatch = useDispatch();
  const { actions } = useDocumentSlice();
  const { items, totalItem, serviceError, isLoading } = useSelector(selectDocument);

  const { path } = useRouteMatch();
  const [updateUriQuery] = useQueryString({ appRoute: AppRoute.document });

  const qs = getQueryParams(location.search);
  const [filterQuery, setFilterQuery] = useState<any>({
    q: qs.get('search') || '',
    fq: qs.get('fq') || '',
    sb: qs.get('sort') || '',
    limit: qs.get('limit') || ITEM_LIMIT,
    page: qs.get('page') || 1,
  });
  const [itemDetail, setItemDetail] = useState(null);
  const [viewMode, setViewMode] = useState(AppStorage.getViewMode() || listViewMode.TABLE);

  useEffect(() => {
    const { q, fq } = filterQuery;

    dispatch(actions.getTotalItemAction({ q, fq }));
    dispatch(actions.getListAction(filterQuery));
  }, [filterQuery, dispatch, actions]);

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

  const handleSwitchViewMode = e => {
    const viewModeValue = e.target.value;
    AppStorage.setViewMode(viewModeValue);
    setViewMode(viewModeValue);
  };

  const handlePrintDoc = ({ filePath }) => {
    printJS({
      printable: filePath,
      type: 'pdf',
      showModal: true,
    });
  };

  const renderList = () => {
    if (viewMode === listViewMode.CARD) {
      return (
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {items &&
              items.map(item => (
                <Col span={8} key={item.id}>
                  <DocCardList
                    item={item}
                    loading={isLoading}
                    pagination={{
                      total: totalItem,
                      pageSize: filterQuery.limit * 1,
                      current: filterQuery.page * 1,
                    }}
                    onPrintDoc={handlePrintDoc}
                    onViewDetail={handleViewDetail}
                    onPageChange={handlePageChange}
                  />
                </Col>
              ))}

            <Col span={24}>
              <Pagination
                showTotal={total => `Total ${total} items`}
                total={totalItem}
                defaultPageSize={20}
                defaultCurrent={1}
                pageSize={filterQuery.limit * 1}
                current={filterQuery.page * 1}
              />
            </Col>
          </Row>
        </Col>
      );
    }

    return (
      <Col span={24}>
        <Card bordered={false}>
          <DocumentList
            items={items}
            loading={isLoading}
            pagination={{
              total: totalItem,
              pageSize: filterQuery.limit * 1,
              current: filterQuery.page * 1,
            }}
            onViewDetail={handleViewDetail}
            onPageChange={handlePageChange}
            onPrintDoc={handlePrintDoc}
          />
        </Card>
      </Col>
    );
  };

  return (
    <BaseCRUDWrapper
      pageTitle="គ្រប់គ្រងឯកសារ"
      refreshRoute={AppRoute.document}
      serviceError={serviceError}
      extraActions={[
        <Link to={`${path}/create`} className="ant-btn ant-btn-primary">
          បង្កើតឯកសារថ្មី
        </Link>,
      ]}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card bordered={false}>
            <Row justify="space-between">
              <SearchFilterBar
                showReset={filterQuery.q || filterQuery.sb || filterQuery.fq}
                value={filterQuery.q}
                onReset={handleResetFilter}
                onSearch={handleSearch}
                onFilter={handleFilter}
              />

              <ToggleViewMode mode={viewMode} onSwitchViewMode={handleSwitchViewMode} />
            </Row>
          </Card>
        </Col>

        {renderList()}
      </Row>

      <DocumentDetail item={itemDetail} visible={!!itemDetail} onClose={handleCloseDetail} />
    </BaseCRUDWrapper>
  );
}
