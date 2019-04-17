import React, { Component } from 'react'
import { Formik } from 'formik'
import { CustomInput } from 'components/custom-input/custom-input'
import { isEmpty } from 'lodash'
import './segment-step2.scss'
import { ButtonMain } from 'components/button/button-main'
import { isValidPlate } from '../../../utils/utils-validation'
import { truckPlateFormatter } from '../../../utils/utils-formatting'

const validator = values => {
  let errors = {}
  if (!isValidPlate(values.truckPlate)) errors.truckPlate = 'Please enter valid truck plate'
  if (!values.parkingAddress) errors.parkingAddress = 'Please enter parking address'
  return errors
}

export class SegmentStep2 extends Component {
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
                error={errors.truckPlate}
                onChange={handleChange}
                value={truckPlateFormatter(values.truckPlate)}
                className='custom-input-step2'
                maxLength={9} placeholder='' type='input' label='Truck plate*' />

              <CustomInput
                name='parkingAddress'
                error={errors.parkingAddress}
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
                <ButtonMain disabled={!isEmpty(errors)} title='Submit' />
              </div>
            </div>
          )
        }}

      </Formik>
    )
  }
}
