import { useFetchProducts } from "@/hooks/useFetchProducts";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const { products, loading, error } = useFetchProducts();

  return (
    <main className="container mx-auto px-6 pt-10 pb-24 md:pt-14 md:pb-32 flex flex-col items-center justify-start">
      <div className="text-center mb-14 flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight lowercase leading-[1.1]">
          ecommerce<br />
          shopping for idiots
        </h1>
      </div>

      {loading ? (
        <div className="text-zinc-500">Loading products...</div>
      ) : error ? (
        <div className="text-red-400">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 w-full max-w-[1400px]">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
