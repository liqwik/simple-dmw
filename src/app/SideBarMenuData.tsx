import React, { memo, useCallback, useState } from 'react';
import {
  BuildTwoTone,
  DashboardTwoTone,
  GoldTwoTone,
  TagTwoTone,
  CrownTwoTone,
  FileTextTwoTone,
} from '@ant-design/icons';
import AppRoute from 'utils/AppRoute';
import { NavLink } from 'react-router-dom';
import Text from 'antd/lib/typography/Text';
import { AppStorage } from 'utils';
import { Menu } from 'antd';

const { SubMenu } = Menu;

type MenuType = {
  key?: string;
  label: string;
  linkTo?: string;
  disabled?: boolean;
  hide?: boolean;
  icon: any;
  children?: MenuType[];
};

function SideBarMenuData({ theme }) {
  const isAdmin = AppStorage.getAuthData() && AppStorage.getAuthData().isAdmin;

  const [menuData] = useState<MenuType[]>([
    {
      key: 'dashboard',
      label: 'របាយការណ៍សង្ខេប',
      linkTo: AppRoute.dashboard,
      hide: !isAdmin,
      icon: <DashboardTwoTone />,
    },
    {
      key: 'document',
      label: 'គ្រប់គ្រងឯកសារ',
      linkTo: AppRoute.document,
      icon: <FileTextTwoTone />,
    },
    {
      key: 'report',
      label: 'របាយការណ៍',
      disabled: true,
      hide: !isAdmin,
      icon: <DashboardTwoTone />,
      children: [
        {
          key: 'monthly',
          label: 'ប្រចាំខែ',
          linkTo: AppRoute.institution,
          icon: <GoldTwoTone />,
        },
        {
          key: 'yearly',
          label: 'ប្រចាំឆ្នាំ',
          linkTo: AppRoute.docType,
          icon: <TagTwoTone />,
        },
      ],
    },
    {
      key: 'ref-data',
      label: 'ទិន្នន័យយោង',
      hide: !isAdmin,
      icon: <BuildTwoTone />,
      children: [
        {
          key: 'institution',
          label: 'អង្គភាព/ស្ថាប័ន',
          linkTo: AppRoute.institution,
          icon: <GoldTwoTone />,
        },
        {
          key: 'doc-type',
          label: 'ប្រភេទឯកសារ',
          linkTo: AppRoute.docType,
          icon: <TagTwoTone />,
        },
      ],
    },
    {
      key: 'user-management',
      label: 'គណនី',
      hide: !isAdmin,
      icon: <CrownTwoTone />,
      children: [
        {
          key: 'user',
          label: 'មន្ត្រីអង្គភាព',
          linkTo: AppRoute.user,
          icon: <CrownTwoTone />,
        },
        {
          key: 'internal-user',
          label: 'អ្នកប្រើប្រាស់ប្រព័ន្ធ',
          linkTo: AppRoute.internalUser,
          hide: !isAdmin,
          icon: <CrownTwoTone />,
        },
      ],
    },
  ]);

  const renderMenu = useCallback(
    menuList =>
      menuList.map(menu => {
        if (menu.hide) return null;

        if (menu.children) {
          return (
            <SubMenu
              key={menu.key}
              icon={menu.icon}
              title={menu.label}
              disabled={menu.disabled || false}
            >
              {renderMenu(menu.children)}
            </SubMenu>
          );
        }

        return (
          <Menu.Item
            key={menu.key}
            disabled={menu.disabled || false}
            icon={menu.icon}
          >
            <Text disabled={menu.disabled || false}>{menu.label}</Text>
            <NavLink to={menu.linkTo || '/'} activeClassName="active" />
          </Menu.Item>
        );
      }),
    [],
  );

  return (
    <Menu theme={theme} mode="inline" style={{ height: '100%' }}>
      {renderMenu(menuData)}
    </Menu>
  );
}

export default memo(SideBarMenuData);
