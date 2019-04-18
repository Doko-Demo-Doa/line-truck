import React, { Component } from 'react'
import './rfi-sent.scss'
import { CloseNoOutlineIcon, TruckIcon } from 'components/icon'
import { ButtonMain } from 'components/button/button-main'

export class RFISent extends Component {
  render () {
    const { onClose } = this.props
    return (
      <div className='rfi-sent'>
        <div className='icon-wrapper'>
          <CloseNoOutlineIcon onClick={onClose} black className='close' />
        </div>

        <TruckIcon black className='paperplane' />

        <div className='headline'>New truck created</div>
        <div className='subheadline'>Thank you for your enquiry. Your request for information has been sent to us.</div>
        <ButtonMain onClick={onClose} className='btn' title='Close' />
      </div>
    )
  }
}
