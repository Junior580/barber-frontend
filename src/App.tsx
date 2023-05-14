import SignIn from './pages/SignIn'
// import SignUp from './pages/SignUp'
import GlobalStyle from './styles/global'

import { AuthContext } from './context/AuthContext'

AuthContext.Provider

const App: React.FC = () => {
  return (
    <>
      <AuthContext.Provider value={{ name: 'user1' }}>
        <SignIn />
      </AuthContext.Provider>
      <GlobalStyle />
    </>
  )
}

export default App
