import React from 'react';
import InternalUserForm from './Form';
import AppRoute from 'utils/AppRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useInternalUserSlice } from './slice';
import { selectInternalUser } from './slice/selectors';
import { Form } from 'antd';

export function InternalUserCreate({ history }) {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { actions } = useInternalUserSlice();
  const { isSubmitting, validationErrors, serviceError } = useSelector(
    selectInternalUser,
  );

  const handleSubmit = values => {
    dispatch(actions.addAction(values));
    history.push(AppRoute.internalUser);
  };

  return (
    <InternalUserForm
      form={form}
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
      onSubmit={handleSubmit}
    />
  );
}
