const colors: Record<string, string> = {
  blue: "text-blue-800 hover:bg-blue-50 border-blue-800",
  red: "text-red-800 hover:bg-red-50 border-red-800",
  green: "text-green-800 hover:bg-green-50 border-green-800",
  yellow: "text-yellow-800 hover:bg-yellow-50 border-yellow-800",
};

export const Button = ({ btnText, color = "blue", handleClick }: { btnText: string; color?: string, handleClick: () => void }) => {
  return (
    <div className="items-center mx-auto my-4 w-full">
      <button
      onClick={handleClick}
        className={`font-bold border-2 cursor-pointer rounded-sm px-3 py-3 w-full ${
          colors[color] ?? colors.blue
        }`}
      >
        {btnText}
      </button>
    </div>
  );
};
