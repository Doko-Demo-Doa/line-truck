import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './app-loader'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
