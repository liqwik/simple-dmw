import React, { memo } from 'react';
import {
  BuildTwoTone,
  DashboardTwoTone,
  GoldTwoTone,
  TagTwoTone,
  CrownTwoTone,
  FileTextTwoTone,
} from '@ant-design/icons';
import AppRoute from 'utils/AppRoute';
import { AppStorage } from 'utils';
import { Menu, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

function SideBarMenuData({ theme }) {
  const { t } = useTranslation();
  const isAdmin = AppStorage.getAuthData() && AppStorage.getAuthData().isAdmin;
  const adminMenu = [
    {
      key: 'dashboard',
      label: t('dashboard'),
      navigateTo: AppRoute.dashboard,
      icon: <DashboardTwoTone />,
    },
    {
      key: 'document',
      label: t('doc.mgmt'),
      navigateTo: AppRoute.document,
      icon: <FileTextTwoTone />,
    },
    {
      key: 'report',
      label: t('report'),
      disabled: true,
      icon: <DashboardTwoTone />,
      children: [
        {
          key: 'monthly',
          label: t('monthly'),
          navigateTo: AppRoute.institution,
          icon: <GoldTwoTone />,
        },
        {
          key: 'yearly',
          label: t('yearly'),
          navigateTo: AppRoute.docType,
          icon: <TagTwoTone />,
        },
      ],
    },
    {
      key: 'ref-data',
      label: t('refData'),
      icon: <BuildTwoTone />,
      children: [
        {
          key: 'institution',
          label: t('institution'),
          navigateTo: AppRoute.institution,
          icon: <GoldTwoTone />,
        },
        {
          key: 'doc-type',
          label: t('doc.type'),
          navigateTo: AppRoute.docType,
          icon: <TagTwoTone />,
        },
      ],
    },
    {
      key: 'user-management',
      label: t('account'),
      icon: <CrownTwoTone />,
      children: [
        {
          key: 'user',
          label: t('user'),
          navigateTo: AppRoute.user,
          icon: <CrownTwoTone />,
        },
        {
          key: 'internal-user',
          label: t('internalUser'),
          navigateTo: AppRoute.internalUser,
          icon: <CrownTwoTone />,
        },
      ],
    },
  ];

  const officerMenu = [
    {
      key: 'document',
      label: t('doc.mgmt'),
      navigateTo: AppRoute.document,
      icon: <FileTextTwoTone />,
    },
  ];

  const transformLabel = (label, navigateTo) =>
    !navigateTo ? (
      label
    ) : (
      <NavLink to={navigateTo} activeClassName="active">
        {label}
      </NavLink>
    );

  const transformMenu = menuList => {
    return menuList.map(({ key, label, disabled, navigateTo, icon, children }) => {
      const menuItem = {
        key,
        icon,
        disabled,
        label: transformLabel(label, navigateTo),
      };

      if (children) {
        menuItem['children'] = transformMenu(children);
      }

      return menuItem;
    });
  };

  return (
    <Menu
      theme={theme}
      mode="inline"
      style={{ height: '100%' }}
      items={transformMenu(isAdmin ? adminMenu : officerMenu)}
    />
  );
}

export default memo(SideBarMenuData);
