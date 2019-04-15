import React, { Component } from 'react'
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
