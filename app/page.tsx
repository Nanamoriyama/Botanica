import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PhotoList from "@/components/PhotoList";
import PlantSearch from "@/components/PlantSearch";
import ProductsList from "@/components/ProductsList";
import Subscribe from "@/components/Subscribe";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <div className="fixed z-50 w-full  bg-yellow-100 text-yellow-800 text-center text-xs py-1 px-4 mt-20">
        Notice: This is not a real website. It was created for practice purposes
        only.
      </div>
      <Hero />
      <PlantSearch />

      <section>
        <h2 className="text-2xl font-light mb-4 text-stone-800 text-center tracking-wider">
          Products
        </h2>
        <ProductsList />
      </section>
      <div className="text-center m-8">
        <Link
          href="/plants"
          className="text-sm bg-stone-900 p-4 text-slate-100 hover:p-5"
        >
          View all
        </Link>
      </div>
    </main>
  );
}
