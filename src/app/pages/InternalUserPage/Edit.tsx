import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import AppRoute from 'utils/AppRoute';
import InternalUserForm from './Form';
import { useInternalUserSlice } from './slice';
import { selectInternalUser } from './slice/selectors';

export function InternalUserEdit({ history }) {
  const { id }: any = useParams();

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { actions } = useInternalUserSlice();
  const {
    itemDetail,
    isSubmitting,
    validationErrors,
    serviceError,
  } = useSelector(selectInternalUser);

  useEffect(() => {
    dispatch(actions.getDetailAction(id));
  }, [id, actions, dispatch]);

  const onSubmit = data => {
    dispatch(actions.updateAction({ id, ...data }));
    history.push(AppRoute.internalUser);
  };

  return (
    <InternalUserForm
      form={form}
      isEdit={true}
      isSubmitting={isSubmitting}
      validateErrors={
        validationErrors &&
        validationErrors.length > 0 &&
        validationErrors.map(err => ({
          name:
            err.field.split('.').length > 0 ? err.field.split('.') : err.field,
          errors: [err.msg],
        }))
      }
      serviceError={serviceError}
      editInternalUser={itemDetail}
      onSubmit={onSubmit}
    />
  );
}
