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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const isAdmin = AppStorage.getAuthData() && AppStorage.getAuthData().isAdmin;

  const [menuData] = useState<MenuType[]>([
    {
      key: 'dashboard',
      label: 'dashboard',
      linkTo: AppRoute.dashboard,
      hide: !isAdmin,
      icon: <DashboardTwoTone />,
    },
    {
      key: 'document',
      label: 'doc.mgmt',
      linkTo: AppRoute.document,
      icon: <FileTextTwoTone />,
    },
    {
      key: 'report',
      label: 'report',
      disabled: true,
      hide: !isAdmin,
      icon: <DashboardTwoTone />,
      children: [
        {
          key: 'monthly',
          label: 'monthly',
          linkTo: AppRoute.institution,
          icon: <GoldTwoTone />,
        },
        {
          key: 'yearly',
          label: 'yearly',
          linkTo: AppRoute.docType,
          icon: <TagTwoTone />,
        },
      ],
    },
    {
      key: 'ref-data',
      label: 'refData',
      hide: !isAdmin,
      icon: <BuildTwoTone />,
      children: [
        {
          key: 'institution',
          label: 'institution',
          linkTo: AppRoute.institution,
          icon: <GoldTwoTone />,
        },
        {
          key: 'doc-type',
          label: 'doc.type',
          linkTo: AppRoute.docType,
          icon: <TagTwoTone />,
        },
      ],
    },
    {
      key: 'user-management',
      label: 'account',
      hide: !isAdmin,
      icon: <CrownTwoTone />,
      children: [
        {
          key: 'user',
          label: 'user',
          linkTo: AppRoute.user,
          icon: <CrownTwoTone />,
        },
        {
          key: 'internal-user',
          label: 'internalUser',
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
              title={t(menu.label)}
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
            <Text disabled={menu.disabled || false}>{t(menu.label)}</Text>
            <NavLink to={menu.linkTo || '/'} activeClassName="active" />
          </Menu.Item>
        );
      }),
    [t],
  );

  return (
    <Menu theme={theme} mode="inline" style={{ height: '100%' }}>
      {renderMenu(menuData)}
    </Menu>
  );
}

export default memo(SideBarMenuData);
