/**
 *
 * Asynchronously loads the component for BrandPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const InstitutionPage = lazyLoad(
  () => import('./index'),
  module => module.InstitutionPage,
);
