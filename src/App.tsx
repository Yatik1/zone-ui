import Signin from './auth/SignIn';
import ChatContainer from './components/ChatContainer';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import useControl from './hooks/useControl';
import ModalAlert from './components/ui/Modal';
import { FlagProps } from './context/ControlContext';

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
  const {isOpen,alertOn} = useControl() as FlagProps

  return (
    <div className='h-screen flex flex-row bg-black'>
      {isOpen && <Sidebar />}
      <ChatContainer />   
      {alertOn && <ModalAlert />}

    </div>
  )
}

export default App;
