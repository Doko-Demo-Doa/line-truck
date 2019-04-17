import React, { Component } from 'react'
import { Formik } from 'formik'
import { isEmpty, union, pull } from 'lodash'
import './segment-step1.scss'
import { Checkbox } from 'components/checkbox/checkbox'
import { CustomInput } from 'components/custom-input/custom-input'
import { ButtonMain } from 'components/button/button-main'
import { localCache, KeySet } from '../../../utils/utils-cache'

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
      suggestions: ['13040 - Wax Sales', '16484 - Wax Laboratory Services', '16484 - Wax Customer Care']
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
    const { onSubmit, productNumber, packagingSize, productDescription } = this.props
    console.log(values)
    const auth = localCache.get(KeySet.AUTH)

    let params = {
      type: 'RFI',
      createdBy: auth.sub,
      createdByName: `${auth.given_name} ${auth.family_name}`,
      countryCode: auth.country,
      categories: values.categories,
      productNo: productNumber,
      productName: productDescription,
      packaging: packagingSize,
      businessUnit: 'Kg',
      comments: values.comments
    }
    params.fields = []
    if (values.categories.includes('PRICE')) {
      params.fields = [
        { fieldKey: 'QUANTITY', value: values.quantity },
        { fieldKey: 'INCO_TERMS', value: values.incoterm },
        { fieldKey: 'MODE_OF_SHIPMENT', value: values.modeOfTransport },
        { fieldKey: 'PORT_OF_DISCHARGE', value: values.portOfDischarge }
      ]
    }
    if (values.categories.includes('DOCUMENT')) {
      params.fields = [
        ...params.fields,
        { fieldKey: 'DOCUMENT_REQUESTING', value: Object.entries(values.documentRequesting).filter(n => n[1] === true).map(n => n[0]).join(',') }
      ]
    }
    if (values.categories.includes('LTA')) {
      params.fields = [
        ...params.fields,
        { fieldKey: 'QUANTITY', value: values.quantity }
      ]
    }
    console.log(params)
    onSubmit(params)
  }

  render () {
    const { incoTerms, modesOfTransport, suggestions, price, documents, leadTimeAvailibility } = this.state

    return (
      <div className='segment-step1'>
        <Formik
          onSubmit={values => this.attemptSubmit(values)}
          validate={validator}
          initialValues={{
            type: 'RFI',
            businessUnit: null,
            subTypes: [],
            incoterm: null,
            quantity: null,
            modeOfTransport: null,
            portOfDischarge: null,
            customFields: [],
            comments: '',
            documentRequesting: {
              msds: false,
              tds: false,
              coa: false,
              pds: false,
              sls: false,
              hscs: false
            }
          }}
        >
          {({ values, handleSubmit, handleChange, setFieldValue, errors }) => {
            const { documentRequesting, businessUnit } = values
            return (
                <>
                  <div className='headline'>What would you like to know?</div>
                  <Checkbox checked={price} onChange={v => {
                    this.onChangeBox('price')
                    setFieldValue('categories', v ? union(values.categories, ['PRICE']) : pull(values.categories, 'PRICE'))
                  }} label='Price' />
                  <Checkbox checked={documents} onChange={(v) => {
                    this.onChangeBox('documents')
                    setFieldValue('categories', v ? union(values.categories, ['DOCUMENT']) : pull(values.categories, 'DOCUMENT'))
                  }} label='Documents' />
                  <Checkbox checked={leadTimeAvailibility} onChange={(v) => {
                    this.onChangeBox('leadTimeAvailibility')
                    setFieldValue('categories', v ? union(values.categories, ['LTA']) : pull(values.categories, 'LTA'))
                  }} label={`Lead Time & Availability`} />

                  <div style={{ height: 46 }} />

                  <CustomInput
                    maxLength={32}
                    onChange={handleChange}
                    name='businessUnit'
                    placeholder='Enter your business unit'
                    type='input-suggestion' onSelectSuggestion={text => setFieldValue('businessUnit', text)}
                    value={businessUnit}
                    suggestions={suggestions} className='segment-input business-input' label='Your business unit *' />
                  {documents && <>
                    <div className='headline'>What would you like to know?</div>
                    <Checkbox checked={documentRequesting.msds} onChange={v => this.onChangeDocumentRequesting(setFieldValue, documentRequesting, 'msds', v)} label='MSDS' />
                    <Checkbox checked={documentRequesting.tds} onChange={v => this.onChangeDocumentRequesting(setFieldValue, documentRequesting, 'tds', v)} label='TDS' />
                    <Checkbox checked={documentRequesting.coa} onChange={v => this.onChangeDocumentRequesting(setFieldValue, documentRequesting, 'coa', v)} label={`COA`} />
                    <Checkbox checked={documentRequesting.pds} onChange={v => this.onChangeDocumentRequesting(setFieldValue, documentRequesting, 'pds', v)} label={`PDS`} />
                    <Checkbox checked={documentRequesting.sls} onChange={v => this.onChangeDocumentRequesting(setFieldValue, documentRequesting, 'sls', v)} label={`Shelf Life Statement`} />
                    <Checkbox checked={documentRequesting.hscs} onChange={v => this.onChangeDocumentRequesting(setFieldValue, documentRequesting, 'hscs', v)} label={`HS code statement`} />
                    <div style={{ height: 36 }} />
                  </>}

                  <div style={{ flexGrow: 2 }} />
                  {(price || leadTimeAvailibility) && <CustomInput value={values.quantity} onChange={e => setFieldValue('quantity', e.target.value)} maxLength={15} placeholder='0' type='input' className='segment-input' unit='KG' label='Quantity*' />}

                  {price && <>
                    <CustomInput placeholder='0' type='select' className='segment-input' value={values.incoterm} onChange={idx => setFieldValue('incoterm', incoTerms[idx])} options={incoTerms} label='Inco terms*' />
                    <CustomInput placeholder='0' type='select' className='segment-input' value={values.modeOfTransport} onChange={idx => {
                      setFieldValue('modeOfTransport', modesOfTransport[idx])
                    }} options={modesOfTransport} label='Mode of shipment*' />
                    <CustomInput onChange={handleChange} name='portOfDischarge' placeholder='Enter Port of Discharge' options={['CGI 01', 'LGI 02']} type='input' className='segment-input' label='Port of discharge*' />
                  </>}

                  <CustomInput onChange={e => setFieldValue('comments', e.target.value)} maxLength={250} placeholder='' type='input-multiline' className='segment-input comment-input' inputClassName='textarea-inside' label='Comments' />

                  <div className='footer-area'>
                    <div>* These fields are mandatory</div>
                    <ButtonMain
                      disabled={(!price && !documents && !leadTimeAvailibility) || !isEmpty(errors)}
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
