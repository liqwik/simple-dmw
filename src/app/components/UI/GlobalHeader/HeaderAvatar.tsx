import React from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Avatar } from 'antd';
import { AppStorage } from 'utils';
import { useTranslation } from 'react-i18next';
import { useLoginSlice } from 'app/pages/AuthPage/slice';
import { useSelector } from 'react-redux';
import { selectLogin } from 'app/pages/AuthPage/slice/selectors';

export const HeaderAvatar = () => {
  useLoginSlice();
  const { user } = useSelector(selectLogin);
  const { t } = useTranslation();

  const displayName = () => {
    let result = '';

    if (user.fn) {
      result = user.fn + ' ';
    }

    if (user.ln) {
      result += user.ln;
    }

    return result;
  };

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
              label: displayName(),
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
