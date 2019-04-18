import React, { Component } from 'react'
import './login-route.scss'
import { CheckGreenIcon } from 'components/icon'
import { LoginForm } from './login-form/login-form'

const LINES = [
  'You can do really cool stuff',
  'And even more cool stuff',
  'You won’t believe it!'
]

export class LoginRoute extends Component {
  render () {
    return (
      <div className='login-route'>
        <div className='left-column'>

          <div className='headline'>Welcome back!</div>
          <div className='cool'>Line Trucks is a very cool platform that combines multiple tools. All of them are very cool and this is why:</div>
          {LINES.map((i, idx) => (
            <div key={idx} className='list'>
              <CheckGreenIcon light />
              <p>{i}</p>
            </div>
          ))}

          <LoginForm />

          <div className='bottom-area'>
            <p>Having problems? Contact support at</p>
            <a href='mailto:support@brenntag.com'>support@linevietnam.com.vn</a>
          </div>
        </div>
      </div>
    )
  }
}
