import React from 'react';

import { Router, AsyncImport } from '../../components';

export default {
  path: '/workbench',
  component: () => <Router routes={[
    {
      exact: true,
      path: '/workbench/',
      component: AsyncImport(() => import('.')),
    }
  ]} />,
  params: { from: 'workbench' },
}