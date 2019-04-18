import React, { Component } from 'react'
import { ButtonMain } from '../../button/button-main'
import './loggedout-layout.scss'

export class LoggedoutLayout extends Component {
  render () {
    const { onClose } = this.props

    return (
      <div onClick={onClose} className='modal-loggedout-layout'>
        <div className='loggedout-head'>Logout Successful</div>
        <div className='loggedout-content'>You have successfully logged out</div>
        <ButtonMain title='Close' />
      </div>
    )
  }
}
