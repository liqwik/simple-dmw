import React, { useCallback } from 'react';
import { Button, message } from 'antd';
import { AppLayoutWithHeader } from 'app/components/UI/Layout';
import { ITEM_LIMIT } from 'utils/constants';

type IBaseCRUDWrapperProps = {
  pageTitle?: string;
  refreshRoute?: string;
  serviceError?: any;
  extraActions?: any;
  children: any;
};

function BaseCRUDWrapper({
  pageTitle,
  refreshRoute,
  serviceError,
  extraActions = [],
  children,
}: IBaseCRUDWrapperProps) {
  React.useEffect(() => {
    if (serviceError) {
      message.error(serviceError);
    }
  }, [serviceError]);

  const handleRefreshPage = useCallback(() => {
    if (refreshRoute) {
      window.location.href = `${refreshRoute}?page=1&limit=${ITEM_LIMIT}`;
    } else {
      window.location.reload();
    }
  }, [refreshRoute]);

  return (
    <AppLayoutWithHeader
      title={pageTitle}
      bg="transparent"
      padding="0"
      extra={[
        <Button type="default" onClick={handleRefreshPage}>
          Refresh
        </Button>,
        ...extraActions,
      ]}
    >
      {children}
    </AppLayoutWithHeader>
  );
}

export default BaseCRUDWrapper;
