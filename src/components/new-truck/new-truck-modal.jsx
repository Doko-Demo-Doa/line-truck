import React, { Component } from 'react'
import './new-truck-modal.scss'
import { SegmentStep1 } from './segment-step1/segment-step1'
import { SegmentStep2 } from './segment-step2/segment-step2'
import { CloseNoOutlineIcon } from 'components/icon'
import { modals } from 'components/modals/modal-registry'
import { RFISent } from 'components/modals/modal-layouts/rfi-sent'
import { truckStatusMapper } from '../../utils/utils-data'
// import { RFISent } from 'components/modals/modal-layouts/rfi-sent'

export class NewTruckModal extends Component {
  params = {}

  state = {
    step: 1,
    driverName: '',
    status: '',
    cargoTypes: []
  }

  async onSubmit (dataStep2: Object) {
    const dataParams = {
      ...this.params,
      ...dataStep2
    }
    console.log(dataParams)
    modals.open({ content: <RFISent onClose={() => this.props.onClose(dataParams)} /> })
  }

  render () {
    const { step, driverName, status, cargoTypes } = this.state

    return (
      <div className='new-truck-modal'>
        <div className='left-column'>
          <div className='new-truck-title'>New truck information</div>
          <div className='new-truck-subtitle'>(Step 1 of 2)</div>
          <div className='new-truck-subtitle2'>We need some information about your new truck detail. Please use this wizard to process.</div>

          <div className='separator' />

          <div className='new-truck-title'>New Truck Info</div>

          <div className='info-item full'>
            <div className='head'>Driver name:</div>
            <div>{driverName || '-'}</div>
          </div>

          <div className='info-item full'>
            <div className='head'>Status:</div>
            <div>{truckStatusMapper(status) || '-'}</div>
          </div>

          <div className='info-item full conditional'>
            <div className='head'>Selected cargo types:</div>
            {cargoTypes.map((item, idx) => <div key={idx}>{`- ${item}`}</div>)}
          </div>

        </div>
        <div className='right-column'>
          <div className='icon-wrapper'>
            <CloseNoOutlineIcon onClick={() => modals.close()} className='ico' />
          </div>
          {step === 1 ? <SegmentStep1
            onUpdate={(fieldName, fieldValue) => this.setState({ [fieldName]: fieldValue })}
            onSubmit={(values) => {
              this.setState({ step: 2 })
              this.params = values
            }} {...this.props} /> : <SegmentStep2 onSubmit={data => this.onSubmit(data)} {...this.props} />}
        </div>
      </div>
    )
  }
}
