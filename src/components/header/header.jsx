import React, { Component } from 'react'
import './header.scss'
import { Logo } from '../logo/logo'
import { SearchBox } from './searchbox/searchbox'
import { ArrowDownIcon } from 'components/icon'
import { WithDropdown } from '../../hocs/with-dropdown/with-dropdown'
import { HeaderMenu } from 'components/header-menu/header-menu'

/* const HEADER_BTNS = [
  { icon: 'dashboard', destination: '/login' },
  { icon: 'list', destination: '/products' },
  { icon: 'pricetag', destination: '/purchase-request' },
  { icon: 'delivery', destination: '/successful' },
  { icon: 'receipt', destination: '/login' },
  { icon: 'notification', destination: '/login' },
  { icon: 'setting', destination: '/login' }
] */

export class Header extends Component {
  onLogout (val) {
    // TODO
  }

  render () {
    return (
      <div className='brenn-header'>
        <Logo size={140} />
        <SearchBox />
        <WithDropdown
          closeAfterClick
          innerClassName='header-menu-extra'
          dropdown={(visible) => (
            <HeaderMenu onClick={(val) => this.onLogout(val)} data={['Preferences', 'Logout']} />
          )}>
          <div className='user-section'>
            <img className='avatar' src='https://www.computerhope.com/jargon/b/black.jpg' />
            <div className='user-name'>User</div>
            <ArrowDownIcon black className='arrow-down' />
          </div>
        </WithDropdown>
      </div>
    )
  }
}
