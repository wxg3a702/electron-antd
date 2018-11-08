
import { AsyncImport } from '../components';

import workbench from './workbench/config';
import scaffold from './scaffold/config';

const routes = [
  { path: '/', exact: true, component: AsyncImport(() => import('./home/index.js')), params: { test: 'ok' } },
  workbench,
  scaffold
]


module.exports = routes
