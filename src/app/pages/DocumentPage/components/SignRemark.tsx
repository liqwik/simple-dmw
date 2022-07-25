import React from 'react';
import { Button, Popover, Typography } from 'antd';
import DateTimeUtil from 'utils/DateTimeUtil';
import { FcApproval } from 'react-icons/fc';

const { Text } = Typography;

const SignRemark = ({ remark, date }) => {
  return (
    <Popover
      content={remark}
      title={<Text strong>{DateTimeUtil.forDisplay(date) || 'គ្មានកាលបរិច្ឆេទ'}</Text>}
      trigger="click"
      overlayClassName="popover-sign"
    >
      <Button type="text" shape="circle" icon={<FcApproval size="28px" />} />
    </Popover>
  );
};

export default SignRemark;
