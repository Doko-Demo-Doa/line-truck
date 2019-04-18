import React, { Component } from 'react'
import './header.scss'
import { Logo } from '../logo/logo'
import { SearchBox } from './searchbox/searchbox'
import { ArrowDownIcon } from 'components/icon'
import { WithDropdown } from '../../hocs/with-dropdown/with-dropdown'
import { HeaderMenu } from 'components/header-menu/header-menu'
import { modals } from 'components/modals/modal-registry'
import { LoggedoutLayout } from 'components/modals/modal-layouts/loggedout-layout'
import { customHistory } from 'common/history'

export class Header extends Component {
  onLogout (val) {
    if (val !== 'Logout') return
    customHistory.push('/login')
    modals.open({
      content: <LoggedoutLayout onClose={() => {
        modals.close()
      }} />
    })
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
