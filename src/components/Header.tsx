import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between border border-b border-gray-200 p-3 bg-white">
        <h2 className="flex items-center justify-center text-2xl font-semibold ml-3 bg-gradient-to-r from-stone-700 via-stone-600 to-stone-500 bg-clip-text text-transparent">
            Zone
        </h2>
        <header className='flex items-center justify-center'>

          <SignedOut>
          <div className='bg-linear-to-br from-stone-700 via-stone-600 to-stone-400 text-white text-sm px-3 py-2 rounded-full shadow-lg/15' onClick={() => navigate("/sign-in")}> 
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