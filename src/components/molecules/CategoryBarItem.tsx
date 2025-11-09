
import { useNavigate } from "react-router";

export const CategoryBarItem = ({
  category,
  categorySlug,
}: {
  category: string;
  categorySlug: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${categorySlug}`);
  };

  return (
    <div className="py-2 cursor-pointer hover:text-blue-600" onClick={handleClick}>
      <p className="text-sm">{category}</p>
    </div>
  );
};
