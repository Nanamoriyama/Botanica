import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PhotoList from "@/components/PhotoList";
import PlantSearch from "@/components/PlantSearch";
import ProductsList from "@/components/ProductsList";
import Subscribe from "@/components/Subscribe";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <PlantSearch />

      <section>
        <h2 className="text-2xl font-light mb-4 text-stone-800 text-center tracking-wider">
          Products
        </h2>
        <ProductsList />
      </section>
    </main>
  );
}
