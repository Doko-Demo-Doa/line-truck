import React from 'react'
import './selection-menu.scss'
import { CheckGreenIcon } from 'components/icon'
import classnames from 'classnames'

export const SelectionMenu = ({ onChange, data, value, className }) => {
  return (
    <div className={classnames('selection-menu', className)}>
      {data.map((item, idx) => (
        <div key={idx} className='sm-item' onClick={() => onChange(idx)}>
          <span>{item}</span>
          {(value === item) && <CheckGreenIcon />}
        </div>
      ))}
    </div>
  )
}

SelectionMenu.defaultProps = {
  data: ['AUD', 'SGD', 'USD'],
  onChange: () => {}
}
