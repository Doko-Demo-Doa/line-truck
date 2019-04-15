import React, { Component } from 'react'
import { SearchIcon, CloseIcon } from 'components/icon'
import './chip.scss'

export class Chip extends Component {
  static defaultProps = {
    label: '',
    onClose: () => {}
  }

  render () {
    const { label, onClose } = this.props
    return (
      <div onClick={onClose} className='line-chip'>
        <SearchIcon />
        <div className='label'>{label}</div>
        <CloseIcon className='close-ico' black />
      </div>
    )
  }
}
