import React, { Component } from 'react'
import logo from './logo.svg'
import './app.css'

class App extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <h1>Hello World!</h1>
        <p>Resize the browser window to see the effect.</p>
        <p>The columns will automatically stack on top of each other when the screen is less than 768px wide.</p>
        <div className='row'>
          <div className='col-sm-4' style={{ backgroundColor: 'lavender' }}>.col-sm-4</div>
          <div className='col-sm-4' style={{ backgroundColor: 'lavenderblush' }}>>.col-sm-4</div>
          <div className='col-sm-4' style={{ backgroundColor: 'red' }}>>.col-sm-4</div>
        </div>
      </div>
    )
  }
}

export default App
