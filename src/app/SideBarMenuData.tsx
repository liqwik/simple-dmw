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
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLoginSlice } from './pages/AuthPage/slice';
import { selectLogin } from './pages/AuthPage/slice/selectors';
import { ACL } from 'utils/acl';
import { ROLES } from 'utils/constants';

function SideBarMenuData({ theme }) {
  useLoginSlice();
  const { t } = useTranslation();
  const { user } = useSelector(selectLogin);
  const { permissions } = user;

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

  const assistantMenu = [
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
      ],
    },
  ];

  const officerMenu = [
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

      if (permissions) return menuItem;
    });
  };

  const getMenuByRole = userPermission => {
    if (userPermission === ROLES.admin || userPermission === 'super_admin') {
      return adminMenu;
    }
    if (userPermission === ROLES.assistant) {
      return assistantMenu;
    }

    return officerMenu;
  };

  return (
    <Menu
      theme={theme}
      mode="inline"
      style={{ height: '100%' }}
      items={transformMenu(getMenuByRole(permissions.toLowerCase()))}
    />
  );
}

export default memo(SideBarMenuData);
