import React, { Component } from 'react'
import './dashboard-route.scss'
import { AuthenLayout } from '../authen-layout'
import { TruckTable } from './truck-table/truck-table'

export class DashboardRoute extends Component {
  render () {
    return (
      <AuthenLayout
        content={(
          <div className='dashboard-route'>
            <TruckTable />
          </div>
        )}
      />
    )
  }
}
