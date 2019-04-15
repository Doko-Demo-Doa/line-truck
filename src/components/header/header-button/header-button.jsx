import React from 'react'
import classnames from 'classnames'
import { DashboardIcon, PriceTagIcon, TruckIcon, ListIcon, ReceiptIcon, BellIcon, CogIcon } from '../../icon'
import './header-button.scss'

export const HeaderButton = ({ active = false, onClick, iconName = 'dashboard' }) => {
  function getIcon () {
    switch (iconName) {
      case 'dashboard':
        return <DashboardIcon className='icon' />
      case 'pricetag':
        return <PriceTagIcon className='icon extra' />
      case 'list':
        return <ListIcon className='icon' />
      case 'delivery':
        return <TruckIcon className='icon extra' />
      case 'receipt':
        return <ReceiptIcon className='icon' />
      case 'notification':
        return <BellIcon className='icon' />
      case 'setting':
        return <CogIcon className='icon' />
      default:
        return <PriceTagIcon className='icon extra' />
    }
  }

  return (
    <div onClick={onClick} className={classnames('header-button', active ? 'brighter' : '')}>
      <div style={{ height: '4px' }} />
      {getIcon()}
      <div className={classnames('indicator', !active ? 'hidden' : '')} />
    </div>
  )
}
