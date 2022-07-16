/**
 *
 * Asynchronously loads the component for BrandPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const InternalUserPage = lazyLoad(
  () => import('./index'),
  module => module.InternalUserPage,
);

export const InternalUserCreate = lazyLoad(
  () => import('./Create'),
  module => module.InternalUserCreate,
);

export const InternalUserEdit = lazyLoad(
  () => import('./Edit'),
  module => module.InternalUserEdit,
);
