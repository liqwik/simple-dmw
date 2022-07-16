import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
  '/backoffice': 'ទំព័រដើម',
  '/backoffice/dashboard': 'Dashboard',
  '/backoffice/tag': 'Tag',
  '/backoffice/brand': 'Brand',
  '/backoffice/photo': 'Photo',
  '/backoffice/story': 'Story',
  '/backoffice/customer-order': 'Customer Order',
  '/backoffice/document': 'ឯកសារ',
  '/backoffice/document/edit': 'កែប្រែ',
  '/backoffice/document/create': 'បង្កើតថ្មី',
  '/backoffice/user': 'មន្ត្រីអង្គភាព',
  '/backoffice/user/create': 'បង្កើត',
  '/backoffice/user/edit': 'កែប្រែ',
  '/backoffice/internal-user': 'អ្នកប្រើប្រាស់ប្រព័ន្ធ',
  '/backoffice/internal-user/create': 'បង្កើត',
  '/backoffice/internal-user/edit': 'កែប្រែ',
};

export function AppBreadcrumb() {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    if (index > 2) return false;

    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    // <Breadcrumb.Item key="home">
    //   <Link to="/">Home</Link>
    // </Breadcrumb.Item>,
    ...extraBreadcrumbItems,
  ];

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
}
