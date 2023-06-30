import GlobalStyle from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/AuthContext'
import { AppRoutes } from './routes'

export const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    <GlobalStyle />
  </BrowserRouter>
)
