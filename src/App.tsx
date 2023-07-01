import GlobalStyle from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/AuthContext'
import { AppRoutes } from './routes'
import { ToastContainer } from './components/ToastContainer'

export const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
      <ToastContainer />
    </AuthProvider>
    <GlobalStyle />
  </BrowserRouter>
)
