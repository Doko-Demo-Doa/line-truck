import React, { Component } from 'react'
import { Formik } from 'formik'
import classnames from 'classnames'
import './login-form.scss'
import { customHistory } from '../../../../common/history'
import { CustomInput } from 'components/custom-input/custom-input'
import { ButtonMain } from '../../../../components/button/button-main'
import { LoginArrowIcon } from 'components/icon'

const validator = values => {
  let errors = {}
  if (!values.username || values.username.length < 2) { errors.username = 'Invalid username' }
  return errors
}

export class LoginForm extends Component {
  async attemptSubmit (values) {
    customHistory.push('/dashboard')
  }

  render () {
    return (
      <Formik
        ref={node => (this.form = node)}
        validate={validator}
        onSubmit={(values) => this.attemptSubmit(values)}
        initialValues={{
          username: 'impuser01',
          password: ''
        }}
      >
        {({ handleChange, handleSubmit, values, setFieldError, errors, isValid }) => {
          return (
              <>
                <form className='login-form' onSubmit={handleSubmit}>
                  <CustomInput value={values.username} error={errors.username} name='username' onChange={handleChange} maxLength={32} placeholder='Your Brenntag Email' type='input' className='login-input' />
                  <CustomInput value={values.password} error={errors.password} name='password' onChange={handleChange} maxLength={20} placeholder='Password' type='password' className='login-input' />
                  <div className={classnames('error-msg')}>{errors.username || errors.password}</div>

                  <ButtonMain disabled={!isValid} title='Login to your account' icon={<LoginArrowIcon />} className='submit-btn' onClick={handleSubmit} />

                  <button type='submit' style={{ display: 'none' }} />

                  <div className='blank' />
                  <div className='forgot'>Forgot Password?</div>
                </form>
              </>
          )
        }}
      </Formik>
    )
  }
}
