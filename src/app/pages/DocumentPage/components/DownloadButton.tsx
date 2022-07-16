import React from 'react';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const DownloadButton: React.FC<any> = ({ src }) => {
  return (
    <Button
      type="text"
      block
      icon={<CloudDownloadOutlined />}
      href={src}
      download
    >
      ទាញយក
    </Button>
  );
};

export default DownloadButton;
