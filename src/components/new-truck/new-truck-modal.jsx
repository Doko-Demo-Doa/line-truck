import React, { Component } from 'react'
import './new-truck-modal.scss'
import { SegmentStep1 } from './segment-step1/segment-step1'
import { SegmentStep2 } from './segment-step2/segment-step2'
import { CloseNoOutlineIcon } from 'components/icon'
import { modals } from 'components/modals/modal-registry'
// import { RFISent } from 'components/modals/modal-layouts/rfi-sent'

export class NewTruckModal extends Component {
  params = {}

  state = {
    step: 1,
    price: false,
    documents: false,
    leadTimeAvailibility: false,
    documentTypes: []
  }

  getNextStep (activeBoxId: number = 0) {
    if (activeBoxId === 0) return 'price'
    if (activeBoxId === 1) return 'documents'
    if (activeBoxId === 2) return 'lead-time'
  }

  onAddExtraData (d: Object) {
    this.setState({
      documentTypes: Object.entries(d)
        .map(([key, value]) => ({ key, value }))
        .filter(n => n.value === true)
    })
  }

  async onSubmit (emails: Array<string>) {
    // modals.open({ content: <RFISent /> })
  }

  render () {
    const { step, documentTypes, documents } = this.state

    return (
      <div className='new-truck-modal'>
        <div className='left-column'>
          <div className='new-truck-title'>New truck information</div>
          <div className='new-truck-subtitle'>(Step 1 of 2)</div>
          <div className='new-truck-subtitle2'>First, we need some information about your new truck detail. Please use this wizard to process.</div>

          <div className='separator' />

          <div className='new-truck-title'>New Truck Info</div>

          <div className='info-item full'>
            <div className='head'>Product Number:</div>
            <div>10003940</div>
          </div>

          <div className='info-item full'>
            <div className='head'>Packaging:</div>
            <div>10003940</div>
          </div>

          <div className='info-item float'>
            <div className='head'>Dangerous:</div>
            <div>Yes</div>
          </div>

          <div className='info-item float'>
            <div className='head'>Hazardous:</div>
            <div>Yes</div>
          </div>

          <div className='info-item float'>
            <div className='head'>Restricted:</div>
            <div>Yes</div>
          </div>

          <div className='info-item full conditional'>
            <div className='head'>Requested Information:</div>
            <div>Test</div>
            <div>Test</div>
          </div>

          {documents && <div className='info-item full conditional last'>
            <div className='head'>Document Types:</div>
            {documentTypes.map((item, idx) => (
              <div key={idx}>{`- aaa`}</div>
            ))}
          </div>}
        </div>
        <div className='right-column'>
          <div className='icon-wrapper'>
            <CloseNoOutlineIcon onClick={() => modals.close()} className='ico' />
          </div>
          {step === 1 ? <SegmentStep1 onChangeActiveBox={v => this.setState(v)} onAddExtraData={d => this.onAddExtraData(d)} onSubmit={(values) => {
            this.setState({ step: 2 })
            this.params = values
          }} {...this.props} /> : <SegmentStep2 type={this.getNextStep()} onSubmit={emails => this.onSubmit(emails)} {...this.props} />}
        </div>
      </div>
    )
  }
}
