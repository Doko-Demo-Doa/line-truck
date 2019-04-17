import React, { Component } from 'react'
import classnames from 'classnames'
import './switch.scss'
import { StarIcon, TruckIcon } from 'components/icon'

type Props = {
  checkedInitially: boolean,
  className: string
}

export class Switch extends Component<Props> {
  static defaultProps = {
    onChange: () => {}
  }

  constructor (props) {
    super(props)
    this.state = {
      checked: !!props.checkedInitially
    }
  }

  onChange () {
    const { disabled } = this.props
    if (disabled) return
    const { checked } = this.state
    const { onChange } = this.props
    this.setState({ checked: !checked }, () => onChange(!checked))
  }

  render () {
    const { checked } = this.state
    const { className, label1, label2 } = this.props

    return (
      <div className={classnames('switch-wrapper', className)} onClick={() => this.onChange()}>
        <div className={classnames('inner', checked ? 'active' : '')}>
          <TruckIcon black={!checked} />
          <span className={classnames(checked ? 'active-text' : '')}>{label1}</span>
        </div>
        <div className={classnames('inner', !checked ? 'active' : '')}>
          <StarIcon black={checked} />
          <span className={classnames(!checked ? 'active-text' : '')}>{label2}</span>
        </div>
        <div className={classnames('inner-animatable', !checked ? 'active' : '')} />
      </div>
    )
  }
}
