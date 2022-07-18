import { useEffect, useRef } from 'react';
import { FormInstance } from 'antd/lib/form';

const useResetFormOnCloseModal = ({ form, visible }: { form: FormInstance; visible: boolean }) => {
  const prevVisibleRef = useRef<boolean>();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    if (!visible && prevVisibleRef.current) {
      form.resetFields();
    }
  }, [form, visible]);
};

export default useResetFormOnCloseModal;
