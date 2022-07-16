/**
 *
 * Asynchronously loads the component for BrandPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DocumentPage = lazyLoad(
  () => import('./index'),
  module => module.DocumentPage,
);

export const DocumentCreate = lazyLoad(
  () => import('./Create'),
  module => module.DocumentCreate,
);

export const DocumentEdit = lazyLoad(
  () => import('./Edit'),
  module => module.DocumentEdit,
);
