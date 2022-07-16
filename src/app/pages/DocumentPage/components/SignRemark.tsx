import React from 'react';
import { Button, Popover, Typography } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import DateTimeUtil from 'utils/DateTimeUtil';

const { Text } = Typography;

const SignRemark: React.FC<any> = ({ remark, date }) => {
  return (
    <Popover
      content={remark}
      title={
        <Text strong>
          {DateTimeUtil.forDisplay(date) || 'គ្មានកាលបរិច្ឆេទ'}
        </Text>
      }
      trigger="click"
      overlayClassName="popover-sign"
    >
      <Button
        shape="circle"
        icon={
          <CheckCircleTwoTone
            twoToneColor="#52c41a"
            style={{ fontSize: '24px', display: 'block' }}
          />
        }
      />
    </Popover>
  );
};

export default SignRemark;
