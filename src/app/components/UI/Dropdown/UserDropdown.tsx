import React from 'react';
import { Select, Form } from 'antd';

type UserDropdownProps = {
  name: string;
  placeholder: string;
  items: Array<any>;
  isLoading?: boolean;
  onLoadmore?: (e) => void;
};

function UserDropdown({
  name,
  placeholder,
  items,
  isLoading,
  onLoadmore,
}: UserDropdownProps) {
  return (
    <Form.Item name={name} noStyle>
      <Select
        showSearch
        style={{ width: '100%' }}
        loading={isLoading}
        placeholder={placeholder}
        onPopupScroll={onLoadmore}
      >
        {/* {renderSelectedValue && (
            <Select.Option
              key={renderSelectedValue.id}
              value={renderSelectedValue.id}
            >
              {renderSelectedValue.fn} {renderSelectedValue.ln}
            </Select.Option>
          )} */}
        {items &&
          items.map(user => (
            <Select.Option key={user.id} value={user.id}>
              {user.fn} {user.ln}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
}

export { UserDropdown };
