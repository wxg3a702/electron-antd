import React from 'react';

import { Router, AsyncImport } from '../../components';

export default {
  path: '/demo',
  component: () => <Router routes={[
    {
      exact: true,
      path: '/demo/',
      params: { config: 'home' },
      component: AsyncImport(() => import('.')),
    }
  ]} />,
  params: { from: 'demo' },
}