import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { ModalRegistry } from 'components/modals/modal-registry'
import { customHistory } from './common/history'
import { DashboardRoute } from './routes/authen-routes/dashboard-route/dashboard-route'
import { LoginRoute } from './routes/guest-routes/login-route/login-route'

class App extends Component {
  render () {
    return (
      <Router history={customHistory}>
        <Switch>
          <Route exact path='/' component={DashboardRoute} />
          <Route path='/dashboard' component={DashboardRoute} />
          <Route path='/login' component={LoginRoute} />
        </Switch>

        <ModalRegistry />
      </Router>
    )
  }
}

export default App
