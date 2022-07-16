import React from 'react';
import {
  QuestionCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

export function MyActionButton({ onEdit, onDelete }) {
  return (
    <>
      <Button type="text" size="small" icon={<EditOutlined />} onClick={onEdit}>
        Edit
      </Button>
      <Popconfirm
        title="Are you sure？"
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        onConfirm={onDelete}
      >
        <Button danger type="link" size="small" icon={<DeleteOutlined />}>
          Delete
        </Button>
      </Popconfirm>
    </>
  );
}

MyActionButton.propsTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
