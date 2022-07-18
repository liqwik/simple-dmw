import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AppRoute from 'utils/AppRoute';
import { ITEM_LIMIT } from 'utils/constants';
import SearchFilterBar from './SearchFilterBar';
import BaseCRUDWrapper from '../App/BaseCRUDWrapper';
import useQueryString from 'hooks/useQueryString';
import { getQueryParams, hasFieldFilter, queryStringToFieldFilter } from 'utils/http';
import { InternalUserList } from './List';
import { selectInternalUser } from './slice/selectors';
import { useInternalUserSlice } from './slice';
import { Link, useRouteMatch } from 'react-router-dom';

interface Props {
  location?: any;
}

export function InternalUserPage({ location }: Props) {
  const qs = getQueryParams(location.search);
  const [filterQuery, setFilterQuery] = useState<any>({
    q: qs.get('search') || '',
    fq: qs.get('fq') || '',
    sb: qs.get('sort') || '',
    limit: qs.get('limit') || ITEM_LIMIT,
    page: qs.get('page') || 1,
  });

  const dispatch = useDispatch();
  const { actions } = useInternalUserSlice();
  const { items, totalItem, serviceError, isLoading } = useSelector(selectInternalUser);

  const [updateUriQuery] = useQueryString({ appRoute: AppRoute.internalUser });
  const { path } = useRouteMatch();

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

    setFilterQuery({
      ...filterQuery,
      ...qs,
    });
    updateUriQuery({ ...filterQuery, ...qs });
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

  return (
    <BaseCRUDWrapper
      pageTitle="អ្នកប្រើប្រាស់ប្រព័ន្ធ"
      refreshRoute={AppRoute.internalUser}
      serviceError={serviceError}
      extraActions={[
        <Link to={`${path}/create`} className="ant-btn ant-btn-primary">
          បង្កើតថ្មី
        </Link>,
      ]}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card bordered={false}>
            <Space style={{ marginBottom: '16px' }}>
              <SearchFilterBar value={filterQuery.q} onSearch={handleSearch} />

              {(filterQuery.q || filterQuery.sb || filterQuery.fq) && (
                <Button onClick={handleResetFilter}>Reset</Button>
              )}
            </Space>

            <InternalUserList
              items={items}
              loading={isLoading}
              pagination={{
                total: totalItem,
                pageSize: filterQuery.limit * 1,
                current: filterQuery.page * 1,
              }}
              onPageChange={handlePageChange}
            />
          </Card>
        </Col>
      </Row>
    </BaseCRUDWrapper>
  );
}
