import React from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export const UploadButton = props => {
  return (
    <div>
      {props.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
};
