/**
 *
 * CategoryPage
 *
 */
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryList } from './List';
import { useCategorySlice } from './slice';
import { selectCategory } from './slice/selectors';
import AppRoute from 'utils/AppRoute';
import { ITEM_LIMIT } from 'utils/constants';
import SearchFilterBar from './SearchFilterBar';
import BaseCRUDWrapper from '../App/BaseCRUDWrapper';
import useQueryString from 'hooks/useQueryString';
import { getQueryParams, hasFieldFilter, queryStringToFieldFilter } from 'utils/http';
import { CategoryForm } from './Form';
import { useForm } from 'antd/lib/form/Form';

interface Props {
  location?: any;
}

export function CategoryPage({ location }: Props) {
  const formInitValue = {
    name: '',
    order: 0,
    imgUrl: '',
    active: true,
    path: '',
    type: 'general',
  };

  const qs = getQueryParams(location.search);

  const [filterQuery, setFilterQuery] = useState<any>({
    q: qs.get('search') || '',
    fq: qs.get('fq') || '',
    sb: qs.get('sort') || '',
    limit: qs.get('limit') || ITEM_LIMIT,
    page: qs.get('page') || 1,
  });
  const [editItem, setEditItem] = useState<any>(null);

  const dispatch = useDispatch();
  const { actions } = useCategorySlice();
  const { items, totalItem, serviceError, validationErrors, isSubmitting, isLoading } = useSelector(selectCategory);

  const [updateUriQuery] = useQueryString({ appRoute: AppRoute.category });
  const [form] = useForm();

  useEffect(() => {
    const { q, fq } = filterQuery;

    dispatch(actions.getTotalItemAction({ q, fq }));
    dispatch(actions.getListAction(filterQuery));
  }, [filterQuery, dispatch, actions]);

  const handleSubmit = values => {
    if (editItem && editItem.id) {
      dispatch(actions.updateAction({ id: editItem.id, ...values }));
    } else {
      dispatch(actions.addAction(values));
    }

    form.resetFields();
    setEditItem(null);
  };

  const handleRemove = id => {
    dispatch(actions.removeAction(id));
  };

  const handleSelectRow = rowData => {
    setEditItem(rowData);
  };

  const handleResetForm = () => {
    form.resetFields();
    setEditItem(null);
  };

  const handleResetFilter = () => {
    const qs = {
      ...filterQuery,
      q: '',
      fq: '',
      sb: '',
      limit: ITEM_LIMIT,
      page: 1,
    };

    form.resetFields();

    setEditItem(null);
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
    <BaseCRUDWrapper pageTitle="Category Management" refreshRoute={AppRoute.category} serviceError={serviceError}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card bordered={false}>
            <CategoryForm
              form={form}
              initialValue={formInitValue}
              loading={isSubmitting}
              validateErrors={
                validationErrors &&
                validationErrors.length > 0 &&
                validationErrors.map(err => ({
                  name: err.field,
                  errors: [err.msg],
                }))
              }
              editData={editItem}
              onReset={handleResetForm}
              onSubmit={handleSubmit}
            />
          </Card>
        </Col>

        <Col span={16}>
          <Card bordered={false}>
            <Space style={{ marginBottom: '16px' }}>
              <SearchFilterBar value={filterQuery.q} onSearch={handleSearch} />

              {(filterQuery.q || filterQuery.sb || filterQuery.fq) && (
                <Button onClick={handleResetFilter}>Reset</Button>
              )}
            </Space>

            <CategoryList
              categories={items}
              loading={isLoading}
              pagination={{
                total: totalItem,
                pageSize: filterQuery.limit * 1,
                current: filterQuery.page * 1,
              }}
              onRemove={handleRemove}
              onPageChange={handlePageChange}
              onSelectRow={handleSelectRow}
            />
          </Card>
        </Col>
      </Row>
    </BaseCRUDWrapper>
  );
}
