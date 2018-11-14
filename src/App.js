import React from 'react';
import { Router } from './components';
import routes from './pages/routes';
import './styles/index.less';
import Sidemenu from './components/SiderMenu';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="app" className="flex row">
        <Sidemenu />
        <Router routes={routes} />
      </div>
    )
  }

} // class App end