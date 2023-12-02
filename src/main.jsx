import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/reset.css'
import {Ime1Provider} from './context/ime1Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Ime1Provider>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
  </Ime1Provider>
  
)
