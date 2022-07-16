/**
 *
 * Asynchronously loads the component for BrandPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DocTypePage = lazyLoad(
  () => import('./index'),
  module => module.DocTypePage,
);
