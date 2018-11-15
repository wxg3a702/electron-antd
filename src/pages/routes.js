
import { AsyncImport } from '../components';

const routes = [
  { path: '/', exact: true, component: AsyncImport(() => import('./home/index.js')), params: { test: 'ok' } },
  { path: '/scaffold', exact: true, component: AsyncImport(() => import('./scaffold/index.js')), params: { test: 'scaffold' } },
  { path: '/workbench', exact: true, component: AsyncImport(() => import('./workbench/index.js')), params: { test: 'workbench' } },
]


module.exports = routes
