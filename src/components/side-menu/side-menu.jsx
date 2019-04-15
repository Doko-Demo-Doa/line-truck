import React, { Component } from 'react'
import './side-menu.scss'
import { SideMenuButton } from './side-menu-button/side-menu-button'

export class SideMenu extends Component {
  render () {
    return (
      <div className='side-menu'>
        <SideMenuButton icon='bs' />
        <SideMenuButton active icon='dashboard' tooltip='Dashboard' />
        <SideMenuButton icon='money' tooltip='Revenue' />
        <SideMenuButton icon='forecast' tooltip='Schedules' />
        <SideMenuButton icon='stockswap' tooltip='Transactions' />
        <SideMenuButton icon='interco' tooltip='Profile Transfers' />
        <SideMenuButton icon='slowmovers' tooltip='Packages' />
        <div style={{ flexGrow: 2 }} />
        <SideMenuButton icon='help' tooltip='Help' />
      </div>
    )
  }
}
