import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { PrivateRoute } from '../../routes/PrivateRoute'

export const Admin: React.FC = () => (
  <>
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  </>
)
