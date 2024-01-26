import GlobalStyle from '../../styles/global'
import { createBrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { SignIn } from '../Home/SignIn'
import { SignUp } from '../Home/SignUp'
import { Admin } from '../Admin'

import { ForgotPassword } from '../Home/ForgotPassword'
import { ResetPassword } from '../Home/ResetPassword'
import { ToastProvider } from '../../hooks/toast'

// export const App: React.FC = () => (
//   <BrowserRouter>
//     <QueryClientProvider client={queryClient}>
//       <ToastProvider>
//         <Routes>
//           <Route path="/" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/*" element={<ResetPassword />} />

//           <Route path="/dashboard/*" element={<Admin />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </ToastProvider>
//     </QueryClientProvider>
//     <GlobalStyle />
//   </BrowserRouter>
// )

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },

  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/*',
    element: <ResetPassword />,
  },
  {
    path: '/dashboard/*',
    element: <Admin />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
])
