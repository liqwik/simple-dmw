import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useInstitution from 'hooks/useInstitution';
import { InstitutionFormModal } from './InstitutionFormModal';

export function InstitutionDropdown({ onSelectedValue }) {
  const { items, dispatchAddAction }: any = useInstitution();
  const [visible, setVisible] = useState(false);
  const isCreateNewData = useRef(false);

  useEffect(() => {
    if (isCreateNewData.current && items && items.length > 0) {
      onSelectedValue(items[0].id);
    }
  }, [items, onSelectedValue]);

  const showForm = () => {
    setVisible(true);
  };

  const closeForm = () => {
    setVisible(false);
  };

  const handleSubmit = values => {
    dispatchAddAction(values);
    isCreateNewData.current = true;
    setVisible(false);
  };

  const handleSearch = value => {
    console.log(value);
  };

  return (
    <>
      <Form.Item label="ប្រភពលិខិត" style={{ marginBottom: '0' }}>
        <Form.Item
          name="institutionId"
          style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            marginRight: '8px',
          }}
        >
          <Select showSearch onSearch={handleSearch} placeholder="ជ្រើសរើសប្រភពលិខិត">
            {items &&
              items.map(ins => (
                <Select.Option key={ins.id} value={ins.id}>
                  {ins.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Button type="primary" onClick={showForm}>
          <PlusOutlined />
        </Button>
      </Form.Item>

      <InstitutionFormModal visible={visible} onSubmit={handleSubmit} onCancel={closeForm} />
    </>
  );
}
