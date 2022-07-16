import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Form } from 'antd';
import useResetFormOnCloseModal from 'hooks/useResetFormOnCloseModal';
import { UserForm } from 'app/features/User/Form';
import { useDispatch } from 'react-redux';
import { useUserSlice } from 'app/pages/UserPage/slice';

export function UserFormModal({ visible, type, onResult, onCancel }: any) {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { actions } = useUserSlice();

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const handleReset = () => {
    form.resetFields();
  };

  const handleSubmit = values => {
    dispatch(actions.addAction({ ...values, userType: type }));
    onResult(values);
  };

  return (
    <Modal
      visible={visible}
      footer={false}
      destroyOnClose={true}
      onCancel={onCancel}
    >
      <UserForm
        preserve={false}
        form={form}
        onReset={handleReset}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
