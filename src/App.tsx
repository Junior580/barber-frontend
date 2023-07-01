import GlobalStyle from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './hooks'
import { AppRoutes } from './routes'

export const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
    <GlobalStyle />
  </BrowserRouter>
)
