import React, { useEffect, useState } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Avatar } from 'antd';
import { AppStorage } from 'utils';
import { useTranslation } from 'react-i18next';

export const HeaderAvatar = () => {
  const { t } = useTranslation();
  const [displayName, setDisplayName] = useState('Anonymous');

  useEffect(() => {
    const userData = AppStorage.getAuthData();
    if (userData && userData.email) {
      setDisplayName(userData.email.split('@')[0]);
    }
  }, []);

  const handleLogout = () => {
    AppStorage.removeAuthData(true);
  };

  return (
    <Dropdown
      placement="bottomLeft"
      overlay={
        <Menu
          items={[
            {
              key: 'name',
              label: displayName,
            },
            {
              key: 'center',
              label: t('logout'),
              icon: <LogoutOutlined />,
              onClick: handleLogout,
            },
          ]}
        />
      }
    >
      <Avatar style={{ backgroundColor: '#87d068', marginRight: '10px' }} icon={<UserOutlined />} />
    </Dropdown>
  );
};
