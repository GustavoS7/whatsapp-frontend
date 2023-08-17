import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/home'
import { Login } from './pages/login'
import { Register } from './pages/register'
import SocketContext from './context/socketContext'
import { logout } from './features/userSlice'

// Socket io
const socket = io(process.env.REACT_APP_API_ENDPOINT_SOCKET)

export function App() {

  const dispatch = useDispatch()

  const { user } =  useSelector((state) => state.user)
  const { files } = useSelector((state) => state.chat)
  const { token } = user

  return (
    <div className='dark'>
      <button onClick={() => dispatch(logout)} className='hidden'>
        logout
      </button>
      <SocketContext.Provider value={socket} >
        <Router>
          <Routes>
            <Route exact path='/' element={token ? <Home socket={socket} /> : <Navigate to="/login" />} />
            <Route exact path='/login' element={!token ? <Login /> : <Navigate to="/" />} />
            <Route exact path='/register' element={!token ? <Register /> : <Navigate to="/" />} />
          </Routes>
        </Router>
      </SocketContext.Provider>
    </div>
  )
}
