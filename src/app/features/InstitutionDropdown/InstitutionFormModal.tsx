import React from 'react';
import useResetFormOnCloseModal from 'hooks/useResetFormOnCloseModal';
import { InstitutionForm } from 'app/pages/InstitutionPage/Form';
import { Form } from 'antd';
import Modal from 'antd/lib/modal/Modal';

export function InstitutionFormModal({ visible, onSubmit, onCancel }) {
  const [form] = Form.useForm();

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Modal visible={visible} footer={false} onCancel={onCancel}>
      <InstitutionForm form={form} onReset={handleReset} onSubmit={onSubmit} />
    </Modal>
  );
}
