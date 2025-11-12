import googleIcon from '../../assets/google.png';

interface GoogleAuthButtonProps {
  title: string;
  handler: () => void | Promise<void>;
  disabled: boolean;
}

const GoogleAuthButton = ({ title, handler, disabled }: GoogleAuthButtonProps) => {

    const handleButtonClick = async () => {
        try{
            await handler();
        }catch(err){
            console.error(err);
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
