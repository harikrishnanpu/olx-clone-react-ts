import toast from 'react-hot-toast';
import googleIcon from '../../assets/google.png';

interface GoogleAuthButtonProps {
  title: string;
  handler: () => void;
  disabled: boolean;
}

const GoogleAuthButton = ({ title, handler, disabled }: GoogleAuthButtonProps) => {

    const handleButtonClick = async () => {
        try{
            const user = await handler();
            console.log(user);
            toast.success("Login successful!");
        }catch(err){
            if(err instanceof Error){
                toast.error(err.message || "Login failed ! Please try again.");
            }
        }
    }

  return (
    <div className="w-full my-2">
      <button
        disabled={disabled}
        onClick={handleButtonClick}
        className="border-gray-700 border-2 flex justify-center items-center w-full text-gray-500 font-bold cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100"
      >
        <img className="w-8 mr-2" src={googleIcon} alt="Google Icon" />
        {title}
      </button>
    </div>
  );
};

export default GoogleAuthButton;
