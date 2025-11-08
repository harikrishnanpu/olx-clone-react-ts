import { ProductsList } from "../components/organisms/ProductsList"


function Home() {
  return (
    <section className="px-2 mt-5">
      <h2 className="text-lg ">Fresh Recommendations</h2>
      <ProductsList />
    </section>
  )
}

export default Home