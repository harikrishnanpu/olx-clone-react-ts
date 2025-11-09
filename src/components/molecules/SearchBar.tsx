import { useState, FormEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Search } from "lucide-react"
import { InputBox } from "../atoms/InputBox"

export const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSearch} className="bg-white w-3/6 mx-2 border-2 border-black rounded-sm md:flex items-center hidden">
      <InputBox 
        placeholder="Find Cars, Mobile Phones and More..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="bg-black py-3 w-12 cursor-pointer items-center flex">
        <Search className="mx-auto" color="#fff" />
      </button>
    </form>
  )
}
