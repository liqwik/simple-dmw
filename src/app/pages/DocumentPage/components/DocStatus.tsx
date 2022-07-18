import React from 'react';
import { Badge } from 'antd';
import { docStatus, DOC_STATUS_LABEL } from 'utils/constants';

const DocStatus: React.FC<any> = ({ value }) => {
  return <Badge status={docStatus.badge[value]} text={DOC_STATUS_LABEL[value]} />;
};

export default DocStatus;
