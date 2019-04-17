import React, { Component } from 'react'
import { union } from 'lodash'
import { Checkbox } from 'components/checkbox/checkbox'
import { CustomInput } from 'components/custom-input/custom-input'
import './segment-step2.scss'
import { ButtonMain } from 'components/button/button-main'
// import { isValidEmail } from '../../../utils/utils-validation'
import ChipInput from 'material-ui-chip-input'
import { isValidEmail } from '../../../utils/utils-validation'
import { localCache, KeySet } from '../../../utils/utils-cache'

export class SegmentStep2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enteredEmails: [],
      me: true,
      someoneElse: false
    }
    this.auth = localCache.get(KeySet.AUTH)
  }

  state = {
    enteredEmails: [],
    me: true,
    someoneElse: false
  }

  onChange = chips => {
    this.setState({ enteredEmails: chips })
  }

  onRemove = value => {
    this.setState({ enteredEmails: this.state.enteredEmails.filter(n => n !== value) })
  }

  render () {
    const { onSubmit } = this.props
    const { enteredEmails, me, someoneElse } = this.state

    return (
      <div className='step-2-document'>
        <div className='head'>Who would you like us to send the response to?</div>
        <Checkbox checked={me} onChange={() => this.setState({ me: !me })} label='Me' />
        <Checkbox checked={someoneElse} onChange={() => this.setState({ someoneElse: !someoneElse })} label='Someone else' />
        <div style={{ height: '40px' }} />
        <CustomInput value={this.auth.email} className='custom-input-step2' maxLength={15} disabled placeholder='' type='input' label='Your Name*' />
        <CustomInput value={`${this.auth.given_name} ${this.auth.family_name}`} className='custom-input-step2' maxLength={15} disabled placeholder='' type='input' label='Your Email Address*' />

        <div className='subheadline'>Other Email Addresses*</div>
        {someoneElse && <ChipInput
          onDelete={this.onRemove}
          onBeforeAdd={value => isValidEmail(value)}
          value={enteredEmails}
          classes={{
            root: 'chip-input-root'
          }}
          onChange={(chips) => this.onChange(chips)}
        />}

        <div className='footer-area'>
          <div>* These fields are mandatory</div>
          <ButtonMain disabled={!me && !someoneElse} onClick={() => onSubmit(union(enteredEmails, me ? [this.auth.email] : []))} title='Submit' />
        </div>

      </div>
    )
  }
}
