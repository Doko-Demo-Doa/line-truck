import React, { Component } from 'react'
import classnames from 'classnames'
import { CheckboxIcon } from 'components/icon'
import './checkbox.scss'

type Props = {
  checkedInitially: boolean,
  className: string
}

export class Checkbox extends Component<Props> {
  static defaultProps = {
    onChange: () => {},
    checked: false
  }

  render () {
    const { className, onChange, checked, label } = this.props

    return (
      <div className={classnames('checkbox-wrapper', className)} onClick={() => onChange(!checked)}>
        <CheckboxIcon className='ico' checked={checked} />
        {label && <div className='checkbox-label'>{label}</div>}
      </div>
    )
  }
}
