import React, { Component } from 'react'
import { connect } from 'react-redux'
import './header.scss'
import { Logo } from '../logo/logo'
import { SearchBox } from './searchbox/searchbox'
import { DrawerIcon, ArrowDownIcon } from 'components/icon'
import { NotificationBadge } from 'components/notification-badge/notification-badge'
import { customHistory } from '../../common/history'
import { localCache, KeySet } from '../../utils/utils-cache'
import { setAccessToken } from '../../api/api'
import { apiAuth } from '../../api/api-auth'
import { modals } from 'components/modals/modal-registry'
import { LoggedoutLayout } from 'components/modals/modal-layouts/loggedout-layout'
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

class _ extends Component {
  onLogout (val) {
    if (val !== 'Logout') return
    modals.open({
      content: <LoggedoutLayout onClose={() => {
        modals.close()
        location.reload()
      }} />
    })

    const data = localCache.get(KeySet.AUTH)
    apiAuth.logout(data.refresh_token, data.access_token).then(r => console.log(r)).catch(e => console.log(e))

    localCache.remove(KeySet.AUTH)
    customHistory.push('/login')
    setAccessToken(null)
  }

  componentDidMount () {

  }

  render () {
    const { auth } = this.props

    return (
      <div className='brenn-header'>
        <Logo size={140} />
        <div className='drawer'>
          <DrawerIcon />
        </div>
        <SearchBox />
        <NotificationBadge />
        <WithDropdown
          closeAfterClick
          innerClassName='header-menu-extra'
          dropdown={(visible) => (
            <HeaderMenu onClick={(val) => this.onLogout(val)} data={['Preferences', 'Logout']} />
          )}>
          <div className='user-section'>
            <img className='avatar' src='https://www.computerhope.com/jargon/b/black.jpg' />
            <div className='user-name'>{auth ? `${auth.given_name} ${auth.family_name}` : 'User'}</div>
            <ArrowDownIcon black className='arrow-down' />
          </div>
        </WithDropdown>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })
export const Header = connect(mapStateToProps)(_)
