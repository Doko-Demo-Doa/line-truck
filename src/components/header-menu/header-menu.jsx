import React, { useState } from 'react'
import { PowerIcon, CogIcon } from 'components/icon'
import classnames from 'classnames'
import './header-menu.scss'

const HeaderMenuItem = ({ text = '', onClick, item, type }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)} className='sm-item' onClick={() => onClick(item)}>
      <CogIcon className='disappeared' />
      <PowerIcon className='disappeared' />
      {type === 'Preferences' ? <CogIcon black={!hovered} /> : <PowerIcon black={!hovered} />}
      <span>{item}</span>
    </div>
  )
}

export const HeaderMenu = ({ onClick, data, value, className }) => {
  return (
    <div className={classnames('header-menu shadow', className)}>
      {data.map((item, idx) => (<HeaderMenuItem onClick={onClick} type={idx === 0 ? 'Preferences' : 'Logout'} key={idx} item={item} />))}
    </div>
  )
}

HeaderMenu.defaultProps = {
  data: ['Preferences', 'Logout'],
  onChange: () => {}
}
