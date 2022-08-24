import React from 'react';
import { Badge } from 'antd';
import { docStatus } from 'utils/constants';
import { useTranslation } from 'react-i18next';

const DocStatus: React.FC<any> = ({ value }) => {
  const { t } = useTranslation();

  return <Badge status={docStatus.badge[value]} text={t(`docStatus.${value}`)} />;
};

export default DocStatus;
