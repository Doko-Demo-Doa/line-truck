import React, { useState } from 'react'
import classnames from 'classnames'
import './with-tooltip.scss'

export const WithTooltip = ({ text, children, className }) => {
  const [indicatorVisibility, setIndicatorVisibility] = useState(false)

  function onEnter (e) {
    e.preventDefault()
    e.stopPropagation()
    setIndicatorVisibility(true)
  }

  function onLeave (e) {
    e.preventDefault()
    e.stopPropagation()
    setIndicatorVisibility(false)
  }

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={classnames('with-tooltip')}>
      {children}
      <div className={classnames('tooltip shadow', className, indicatorVisibility ? 'visible' : 'hidden')}>
        {text}
      </div>
    </div>
  )
}

WithTooltip.defaultProps = {
  text: ''
}
