import React, { Component } from 'react'
import { Formik } from 'formik'
import { CustomInput } from 'components/custom-input/custom-input'
import { isEmpty } from 'lodash'
import './segment-step2.scss'
import { ButtonMain } from 'components/button/button-main'
import { isValidPlate } from '../../../utils/utils-validation'
import { truckPlateFormatter, removeAllNonNumeric, isValidUnit, formatCurrency } from '../../../utils/utils-formatting'

const validator = values => {
  let errors = {}
  if (!isValidPlate(values.truckPlate)) errors.truckPlate = 'Please enter valid truck plate'
  if (!values.parkingAddress) errors.parkingAddress = 'Please enter parking address'
  if (!values.truckType) errors.truckType = 'Please choose truck type'
  if (!isValidUnit(values.vLength)) errors.vLength = 'Please enter valid length'
  if (!isValidUnit(values.vWidth)) errors.vWidth = 'Please enter valid width'
  if (!isValidUnit(values.vHeight)) errors.vHeight = 'Please enter valid height'
  return errors
}

const TRUCK_TYPES = [1, 5, 10, 20]

export class SegmentStep2 extends Component {
  render () {
    const { onSubmit } = this.props

    return (
      <Formik
        onSubmit={values => onSubmit(values)}
        validate={validator}
        initialValues={{
          truckPlate: '',
          parkingAddress: '',
          description: '',
          truckType: null
        }}>
        {({ values, handleSubmit, handleChange, setFieldValue, isValid, errors }) => {
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
                type='select'
                error={errors.truckType}
                className='segment-input' value={values.truckType}
                onChange={idx => {
                  setFieldValue('truckType', TRUCK_TYPES[idx])
                }} options={TRUCK_TYPES} label='Truck Type*' />

              <CustomInput
                maxLength={11}
                onChange={e => setFieldValue('price', removeAllNonNumeric(e.target.value))}
                error={errors.driverName}
                placeholder='1,000,000'
                type='input'
                value={formatCurrency(values.price)}
                unit='VND'
                label='Price *' />

              <div className='dimensions'>
                <CustomInput
                  label='Length*'
                  error={errors.vLength}
                  onChange={e => setFieldValue('vLength', removeAllNonNumeric(e.target.value))}
                  value={values.vLength}
                  maxLength={3} type='input' unit='L'
                  className='dimension' />

                <CustomInput
                  label='Width*'
                  error={errors.vWidth}
                  onChange={e => setFieldValue('vWidth', removeAllNonNumeric(e.target.value))}
                  value={values.vWidth}
                  maxLength={3} type='input' unit='W'
                  className='dimension middle' />

                <CustomInput
                  label='Height*'
                  error={errors.vHeight}
                  onChange={e => setFieldValue('vHeight', removeAllNonNumeric(e.target.value))}
                  value={values.vHeight}
                  maxLength={3} type='input' unit='H'
                  className='dimension' />
              </div>

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
                <ButtonMain onClick={handleSubmit} disabled={!isValid || !isEmpty(errors)} title='Submit' />
              </div>
            </div>
          )
        }}

      </Formik>
    )
  }
}
