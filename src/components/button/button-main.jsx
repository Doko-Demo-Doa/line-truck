import React from 'react'
import classnames from 'classnames'
import './button-main.scss'

export const ButtonMain = ({ onClick, disabled, title, icon, className }) => {
  return (
    <div onClick={!disabled ? onClick : null} className={classnames('button-main', className, disabled ? 'button-main-disabled' : '')}>
      {title}
      {React.isValidElement(icon) && React.cloneElement(icon)}
    </div>
  )
}
