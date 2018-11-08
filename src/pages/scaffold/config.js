import React from 'react';

import { Router, AsyncImport } from '../../components';

export default {
  path: '/scaffold',
  component: () => <Router routes={[
    {
      exact: true,
      path: '/scaffold/',
      component: AsyncImport(() => import('.')),
    }
  ]} />,
  params: { from: 'scaffold' },
}