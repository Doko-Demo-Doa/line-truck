import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { customHistory } from './common/history'
import { DashboardRoute } from './routes/authen-routes/dashboard-route/dashboard-route'
import { ModalRegistry } from 'components/modals/modal-registry'

class App extends Component {
  render () {
    return (
      <Router history={customHistory}>
        <Switch>
          <Route exact path='/' component={DashboardRoute} />
          <Route path='/dashboard' component={DashboardRoute} />
        </Switch>

        <ModalRegistry />
      </Router>
    )
  }
}

export default App
