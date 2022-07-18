import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import AppRoute from 'utils/AppRoute';
import DocumentForm from './Form';
import { useDocumentSlice } from './slice';
import { selectDocument } from './slice/selectors';

export function DocumentEdit({ history }) {
  const { id }: any = useParams();
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { actions } = useDocumentSlice();
  const { itemDetail, isSubmitting, validationErrors, serviceError } = useSelector(selectDocument);

  useEffect(() => {
    dispatch(actions.getDetailAction(id));

    return () => {
      dispatch(actions.resetAction());
    };
  }, [id, actions, dispatch]);

  const onSubmit = data => {
    dispatch(actions.updateAction({ id, ...data }));
    history.push(AppRoute.document);
  };

  return (
    <DocumentForm
      form={form}
      isEdit={true}
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
      editDocument={itemDetail}
      onSubmit={onSubmit}
    />
  );
}
