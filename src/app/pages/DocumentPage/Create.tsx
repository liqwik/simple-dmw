import React from 'react';
import DocumentForm from './Form';
import AppRoute from 'utils/AppRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useDocumentSlice } from './slice';
import { selectDocument } from './slice/selectors';
import { Form } from 'antd';

export function DocumentCreate({ history }) {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { actions } = useDocumentSlice();
  const { isSubmitting, validationErrors, serviceError } = useSelector(selectDocument);

  const handleSubmit = values => {
    dispatch(actions.addAction(values));
    history.push(AppRoute.document);
  };

  return (
    <DocumentForm
      form={form}
      isSubmitting={isSubmitting}
      validateErrors={
        validationErrors &&
        validationErrors.length > 0 &&
        validationErrors.map(err => ({
          name: err.field.split('.').length > 0 ? err.field.split('.') : err.field,
          errors: [err.msg],
        }))
      }
      serviceError={serviceError}
      onSubmit={handleSubmit}
    />
  );
}
