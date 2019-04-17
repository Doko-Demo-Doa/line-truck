import React, { Component } from 'react'
import { Formik } from 'formik'
import { isEmpty, union, pull } from 'lodash'
import './segment-step1.scss'
import { Checkbox } from 'components/checkbox/checkbox'
import { CustomInput } from 'components/custom-input/custom-input'
import { ButtonMain } from 'components/button/button-main'

const CARGO_TYPES = [
  'Computer',
  'Electronic',
  'Vegetable',
  'Medicine',
  'Animal',
  'Metal',
  'Chemical',
  'Frozen Liquid',
  'Clothes',
  'Shoes'
]

const validator = values => {
  let errors = {}
  return errors
}

/**
 * Step 1 for all three RFI types.
 * Each checkbox has its own effect and sub-form.
 */
export class SegmentStep1 extends Component {
  constructor (props) {
    console.log(props)
    super(props)
    this.state = {
      price: false,
      documents: false,
      leadTimeAvailibility: false,
      suggestions: ['Nguyen Van A', 'Nguyen Van B', 'Nguyen Van C'],
      statuses: ['In-use', 'New', 'Stopped']
    }
  }

  onChangeBox (type: number): void {
    this.props.onChangeActiveBox({ [type]: !this.state[type] })
    this.setState({ [type]: !this.state[type] })
  }

  onChangeDocumentRequesting (setFieldValue: Function, fullObj: Object, fieldName: string, value: boolean) {
    const data = { ...fullObj, [fieldName]: value }
    setFieldValue('documentRequesting', data)
    this.props.onAddExtraData(data)
  }

  attemptSubmit (values) {
    console.log(values)
  }

  render () {
    const { suggestions, price, documents, statuses } = this.state

    return (
      <div className='segment-step1'>
        <Formik
          onSubmit={values => this.attemptSubmit(values)}
          validate={validator}
          initialValues={{
            cargoTypes: [],
            driverName: null,
            status: null
          }}
        >
          {({ values, handleSubmit, handleChange, setFieldValue, errors }) => {
            const { driverName } = values
            return (
                <>
                  <div className='headline'>Please choose cargo type (Up to 10)</div>
                  <>
                    {CARGO_TYPES.map((item, idx) => (
                      <Checkbox key={idx} checked={values.cargoTypes.find(n => n === item)} onChange={v => {
                        setFieldValue('cargoTypes', v ? union(values.cargoTypes, [item]) : pull(values.cargoTypes, item))
                      }} label={item} />
                    ))}
                  </>

                  <div style={{ height: 46 }} />

                  <CustomInput
                    maxLength={32}
                    onChange={handleChange}
                    name='driverName'
                    placeholder='Adam Sanders'
                    type='input-suggestion' onSelectSuggestion={text => setFieldValue('driverName', text)}
                    value={driverName}
                    suggestions={suggestions} className='segment-input business-input' label='Driver name *' />

                  <div style={{ flexGrow: 2 }} />

                  <CustomInput
                    type='select'
                    className='segment-input' value={values.status}
                    onChange={idx => setFieldValue('status', statuses[idx])} options={statuses} label='Status*' />

                  <div className='footer-area'>
                    <div>* These fields are mandatory</div>
                    <ButtonMain
                      disabled={(!price && !documents) || !isEmpty(errors)}
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
