import Signin from './auth/SignIn';
import ChatContainer from './components/ChatContainer';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import useControl from './hooks/useControl';

function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />} />
      <Route path="/:id" element={<AppLayout />} />
      <Route path='/auth/sign-in' element={<Signin />} />
    </Routes>
  );
}

function AppLayout() {
  const {isOpen} = useControl() as any
  return (
    <div className='min-h-screen flex flex-row'>
      {isOpen && <Sidebar />}
      <ChatContainer />
    </div>
  )
}

export default App;
