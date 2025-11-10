import { useSearchParams } from "react-router";
import { ProductsList } from "../components/organisms/ProductsList"

function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  return (
    <section className="px-2 mt-5">
      <h2 className="text-sm font-bold">
        {searchQuery ? `Search Results: "${searchQuery}"` : "Fresh Recommendations"}
      </h2>
      <ProductsList searchQuery={searchQuery} />
    </section>
  )
}

export default Home