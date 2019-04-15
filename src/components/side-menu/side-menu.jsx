import React, { Component } from 'react'
import './side-menu.scss'
import { SideMenuButton } from './side-menu-button/side-menu-button'

export class SideMenu extends Component {
  render () {
    return (
      <div className='side-menu'>
        <SideMenuButton icon='bs' />
        <SideMenuButton icon='dashboard' tooltip='Dashboard' />
        <SideMenuButton icon='money' tooltip='Money Penny' />
        <SideMenuButton icon='forecast' tooltip='Demand Forecast' />
        <SideMenuButton icon='stockswap' tooltip='Stock Swap' />
        <SideMenuButton active icon='interco' tooltip='Intercompany Trade' />
        <SideMenuButton icon='slowmovers' tooltip='Slow Movers' />
        <div style={{ flexGrow: 2 }} />
        <SideMenuButton icon='help' tooltip='Help' />
      </div>
    )
  }
}
