import React from 'react';
import { Router } from './components';
import routes from './pages/routes';
import './styles/index.less';
import Sidemenu from './components/SiderMenu';
import { Provider } from 'react-redux';
import store from './redux/store';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <div id="app" className="flex row">
          <Sidemenu />
          <Router routes={routes} />
        </div>
      </Provider>
    )
  }

} // class App end