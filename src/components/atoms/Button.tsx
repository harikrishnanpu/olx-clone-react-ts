const colors: Record<string, string> = {
  blue: "text-blue-800 hover:bg-blue-50 border-blue-800",
  red: "text-red-800 hover:bg-red-50 border-red-800",
  green: "text-green-800 hover:bg-green-50 border-green-800",
  yellow: "text-yellow-800 hover:bg-yellow-50 border-yellow-800",
};

export const Button = ({ 
  btnText, 
  color = "blue", 
  handleClick, 
  loading = false, 
  disabled = false 
}: { 
  btnText: string; 
  color?: string; 
  handleClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}) => {
  const isDisabled = loading || disabled;
  
  return (
    <div className="items-center mx-auto my-4 w-full">
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`font-bold border-2 rounded-sm px-3 py-3 w-full ${
          isDisabled 
            ? 'bg-gray-400 cursor-not-allowed text-gray-600 border-gray-400' 
            : `cursor-pointer ${colors[color] ?? colors.blue}`
        }`}
      >
        {loading ? 'Loading...' : btnText}
      </button>
    </div>
  );
};
