import Signin from './auth/SignIn';
import ChatContainer from './components/ChatContainer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />} />
      <Route path='/auth/sign-in' element={<Signin />} />
    </Routes>
  );
}

function AppLayout() {
  return (
    <div className='min-h-screen'>
      <ChatContainer />
    </div>
  )
}

export default App;
