import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { PanelLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useControl from '../hooks/useControl';

function Header() {

  const navigate = useNavigate()
  const {isOpen, setIsOpen} = useControl() as any

  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-2.5 h-13 bg-white">
        
         { !isOpen && (
          <nav className='flex items-center justify-center'>        
       
          <small 
            className='flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 p-2 rounded-xl'
            onClick={() => setIsOpen(true)}
          >
            <PanelLeft size={20}/>
          </small>
          <h2 className="flex items-center justify-center text-2xl font-semibold bg-gradient-to-r from-stone-700 via-stone-600 to-stone-500 bg-clip-text text-transparent">
            Zone
          </h2>
         </nav>
         )
         }
        <header className='flex w-full items-center justify-end'>

          <SignedOut>
          <div className='bg-linear-to-br from-stone-700 via-stone-600 to-stone-400 text-white text-sm px-3 py-2 rounded-full shadow-lg/15' onClick={() => navigate("/auth/sign-in")}> 
            Sign in
          </div>
          </SignedOut>

          <div className='flex items-center justify-center shadow-lg/20 w-fit h-fit rounded-full'>
          <SignedIn>
            <UserButton />
          </SignedIn>
          </div>
        </header>
    </div>
  )
}

export default Header