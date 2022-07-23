import DashboardPage from './pages/DashboardPage';
import { CategoryPage } from './pages/CategoryPage/Loadable';
import { InternalUserCreate, InternalUserEdit, InternalUserPage } from './pages/InternalUserPage/Loadable';

import AppRoute from 'utils/AppRoute';
import { DocumentCreate, DocumentEdit, DocumentPage } from './pages/DocumentPage/Loadable';
import { DocTypePage } from './pages/DocTypePage/Loadable';
import { InstitutionPage } from './pages/InstitutionPage/Loadable';
import { UserPage } from './pages/UserPage/Loadable';

const routes: Array<any> = [
  {
    path: AppRoute.dashboard,
    title: 'Dashboard',
    component: DashboardPage,
  },
  {
    path: AppRoute.category,
    title: 'Category',
    component: CategoryPage,
  },
  {
    path: AppRoute.docType,
    title: 'ប្រភេទឯកសារ',
    component: DocTypePage,
  },
  {
    path: AppRoute.institution,
    title: 'អង្គភាព/ស្ថាប័ន',
    component: InstitutionPage,
  },
  {
    path: AppRoute.document,
    title: 'ឯកសារ',
    exact: true,
    component: DocumentPage,
  },
  {
    path: `${AppRoute.document}/create`,
    title: 'បង្កើតឯកសារថ្មី',
    component: DocumentCreate,
  },
  {
    path: `${AppRoute.document}/edit/:id`,
    title: 'កែប្រែឯកសារ',
    component: DocumentEdit,
  },
  {
    path: AppRoute.user,
    title: 'មន្ត្រីអង្គភាព',
    exact: true,
    component: UserPage,
  },
  {
    path: AppRoute.internalUser,
    title: 'អ្នកប្រើប្រាស់ប្រព័ន្ធ',
    exact: true,
    component: InternalUserPage,
  },
  {
    path: `${AppRoute.internalUser}/create`,
    title: 'បង្កើត អ្នកប្រើប្រាស់ប្រព័ន្ធ',
    component: InternalUserCreate,
  },
  {
    path: `${AppRoute.internalUser}/edit/:id`,
    title: 'កែប្រែ អ្នកប្រើប្រាស់ប្រព័ន្ធ',
    component: InternalUserEdit,
  },
];

export default routes;
