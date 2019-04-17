import React, { Component } from 'react'
import { Formik } from 'formik'
import { CustomInput } from 'components/custom-input/custom-input'
import './segment-step2.scss'
import { ButtonMain } from 'components/button/button-main'

const validator = values => {
  let errors = {}
  return errors
}

export class SegmentStep2 extends Component {
  onChange = chips => {
    this.setState({ enteredEmails: chips })
  }

  onRemove = value => {
    this.setState({ enteredEmails: this.state.enteredEmails.filter(n => n !== value) })
  }

  render () {
    // const { onSubmit } = this.props

    return (
      <Formik
        onSubmit={values => this.attemptSubmit(values)}
        validate={validator}
        initialValues={{
          truckPlate: '',
          parkingAddress: null,
          description: null
        }}>
        {({ values, handleSubmit, handleChange, setFieldValue, errors }) => {
          return (
            <div className='step-2-document'>
              <div className='head'>We need a bit more information. How about your vehicle?</div>
              <CustomInput
                name='truckPlate'
                onChange={handleChange}
                value={values.truckPlate}
                className='custom-input-step2'
                maxLength={15} placeholder='' type='input' label='Truck plate*' />

              <CustomInput
                name='parkingAddress'
                value={values.parkingAddress}
                onChange={handleChange}
                maxLength={500} placeholder=''
                type='input-multiline' className='segment-input pa-input'
                inputClassName='textarea-inside' label='Parking address*' />

              <div style={{ height: '40px' }} />

              <CustomInput
                name='description'
                value={values.description}
                onChange={handleChange}
                maxLength={200} placeholder=''
                type='input-multiline' className='segment-input desc-input'
                inputClassName='textarea-inside' label='Description' />

              <div className='footer-area'>
                <div>* These fields are mandatory</div>
                <ButtonMain title='Submit' />
              </div>
            </div>
          )
        }}

      </Formik>
    )
  }
}
