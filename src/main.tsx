import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './pages/App/App'

import { BrowserRouter } from 'react-router-dom'
import QueryProvider from './providers/queryProvider'
import AppProvider from './hooks/index'
import GlobalStyle from '../src/styles/global'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </QueryProvider>
      <GlobalStyle />
    </BrowserRouter>
  </React.StrictMode>,
)
