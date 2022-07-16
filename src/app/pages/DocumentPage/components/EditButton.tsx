import React from 'react';
import { Link } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';

const EditButton: React.FC<any> = ({ to }) => {
  return (
    <Link className="btn-action" to={to}>
      <EditOutlined /> <span>កែប្រែ</span>
    </Link>
  );
};

export default EditButton;
