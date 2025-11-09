


const LoginButton = ({handleClick}:{handleClick: ()=> void}) => {
  return (
    <div onClick={handleClick} className="ml-4 border-b-2 hover:border-none cursor-pointer">
        <p className="font-bold">Login</p>
    </div>
  )
}

export default LoginButton