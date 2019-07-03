import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login.js'

ReactDOM.render(<Login />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept()
  }
