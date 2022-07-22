import React from 'react';
import { Radio } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

interface ToggleViewModeProps {
  mode: string;
  onSwitchViewMode: (e) => void;
}

const ToggleViewMode = ({ mode, onSwitchViewMode }: ToggleViewModeProps) => {
  return (
    <Radio.Group value={mode} onChange={onSwitchViewMode}>
      <Radio.Button value="card">
        <AppstoreOutlined />
      </Radio.Button>
      <Radio.Button value="table">
        <BarsOutlined />
      </Radio.Button>
    </Radio.Group>
  );
};

export default ToggleViewMode;
