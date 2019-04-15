import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
// import './styles/bootstrap/bootstrap-grid.min.css'
import App from './app-loader'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
