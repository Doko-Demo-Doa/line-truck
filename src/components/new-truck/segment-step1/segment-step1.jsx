import React, { Component } from 'react'
import { Formik } from 'formik'
import { isEmpty, union, pull } from 'lodash'
import './segment-step1.scss'
import { Checkbox } from 'components/checkbox/checkbox'
import { CustomInput } from 'components/custom-input/custom-input'
import { ButtonMain } from 'components/button/button-main'
import { isValidIndex } from '../../../utils/utils-validation'

const CARGO_TYPES = [
  'Computer',
  'Electronic',
  'Vegetable',
  'Medicine',
  'Animal',
  'Metal',
  'Chemical',
  'Kid toys',
  'Clothes',
  'Shoes'
]

const validator = values => {
  let errors = {}
  if (values.cargoTypes.length <= 0) errors.cargoTypes = 'Please choose at least one type'
  if (!values.driverName) errors.driverName = 'Please enter driver name'
  if (!isValidIndex(values.status)) errors.status = 'Please choose vehicle status'
  return errors
}

export class SegmentStep1 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      suggestions: ['Nguyen Van A', 'Nguyen Van B', 'Nguyen Van C'],
      statuses: ['In-use', 'New', 'Stopped']
    }
  }

  attemptSubmit (values) {
    this.props.onSubmit(values)
  }

  onUpdate (fieldName, fieldValue) {
    this.props.onUpdate(fieldName, fieldValue)
  }

  render () {
    const { suggestions, statuses } = this.state

    return (
      <div className='segment-step1'>
        <Formik
          onSubmit={values => this.attemptSubmit(values)}
          validate={validator}
          initialValues={{
            cargoTypes: [],
            driverName: '',
            status: ''
          }}
        >
          {({ values, handleSubmit, handleChange, isInitialValid, isValid, setFieldValue, errors }) => {
            const { driverName } = values
            return (
                <>
                  <div className='headline'>Please choose cargo type (Up to 10)</div>
                  <>
                    {CARGO_TYPES.map((item, idx) => (
                      <Checkbox key={idx} checked={values.cargoTypes.find(n => n === item)} onChange={v => {
                        const output = v ? union(values.cargoTypes, [item]) : pull(values.cargoTypes, item)
                        this.onUpdate('cargoTypes', output)
                        setFieldValue('cargoTypes', output)
                      }} label={item} />
                    ))}
                  </>

                  <div style={{ height: 46 }} />

                  <CustomInput
                    maxLength={32}
                    onChange={e => {
                      this.onUpdate('driverName', e.target.value)
                      setFieldValue('driverName', e.target.value)
                    }}
                    error={errors.driverName}
                    name='driverName'
                    placeholder='Adam Sanders'
                    type='input-suggestion'
                    onSelectSuggestion={text => {
                      this.onUpdate('driverName', text)
                      setFieldValue('driverName', text)
                    }}
                    value={driverName}
                    suggestions={suggestions} className='segment-input business-input' label='Driver name *' />

                  <div style={{ flexGrow: 2 }} />

                  <CustomInput
                    type='select'
                    error={errors.status}
                    className='segment-input' value={statuses[values.status]}
                    onChange={idx => {
                      this.onUpdate('status', idx)
                      setFieldValue('status', idx)
                    }} options={statuses} label='Status*' />

                  <div style={{ height: 42 }} />

                  <div className='footer-area'>
                    <div>* These fields are mandatory</div>
                    <ButtonMain
                      disabled={!isValid && !isEmpty(errors)}
                      onClick={handleSubmit} title='Go to step 2' />
                  </div>
                </>
            )
          }}

        </Formik>
      </div>
    )
  }
}
