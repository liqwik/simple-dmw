import React from 'react';
import { Segmented } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

interface ToggleViewModeProps {
  mode: string;
  onSwitchViewMode: (value) => void;
}

const ToggleViewMode = ({ mode, onSwitchViewMode }: ToggleViewModeProps) => {
  return (
    <Segmented
      value={mode}
      options={[
        {
          value: 'table',
          icon: <BarsOutlined />,
        },
        {
          value: 'card',
          icon: <AppstoreOutlined />,
        },
      ]}
      onChange={onSwitchViewMode}
    />
  );
};

export default ToggleViewMode;
