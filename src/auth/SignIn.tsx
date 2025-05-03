import { SignIn } from "@clerk/clerk-react"
function Signin() {
  return (
    <div className="bg-white w-screen h-screen absolute flex items-center justify-center">
        <SignIn />
    </div>
  )
}

export default Signin
