import { useState } from "react";
import type { Product } from "@/hooks/useFetchProducts";
import { AspectRatio } from "@/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { useCart } from "@/context/CardContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      bgColor: product.bgColor
    });

    setIsAdded(true);
    toast(`${product.title.toLowerCase()} added to your bag.`);

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group flex flex-col gap-3 cursor-pointer text-left">
          <div className={cn("overflow-hidden bg-[#1c1c1e]", product.bgColor)}>
            <AspectRatio ratio={3 / 4}>
              <img
                src={product.image}
                alt={product.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xm font-light text-zinc-300 tracking-wide">
              {product.title}
            </h3>
            <p className="text-xm font-light text-zinc-500">
              £{product.price}
            </p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] md:max-w-[850px] bg-[#121212] border border-zinc-800 text-white p-0 gap-0 overflow-hidden rounded-none sm:rounded-none ring-0 focus:ring-0">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          {/* Left Column: Image (Full-bleed, absolutely no padding/borders) */}
          <div className={cn("relative w-full min-h-[350px] md:min-h-[500px] overflow-hidden", product.bgColor || "bg-[#1c1c1e]")}>
            <img
              src={product.image}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col justify-between p-8 md:p-12 bg-[#121212]">
            <DialogHeader className="flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-semibold">
                  {product.category}
                </span>
                <DialogTitle className="text-2xl md:text-3xl font-bold tracking-tight text-white lowercase leading-tight">
                  {product.title}
                </DialogTitle>
              </div>

              <div className="text-xl font-light text-zinc-200">
                £{product.price}
              </div>

              {product.rating && (
                <div className="flex items-center gap-2 text-base md:text-lg font-light text-zinc-400">
                  <div className="flex items-center text-yellow-500">
                    ★ <span className="ml-1 text-zinc-300 font-medium">{product.rating.rate}</span>
                  </div>
                  <span>•</span>
                  <span>{product.rating.count} reviews</span>
                </div>
              )}

              <DialogDescription className="text-base md:text-lg font-light text-zinc-300 tracking-wide leading-relaxed mt-2">
                {product.description || "Minimalist product curated for the YOLO lifestyle. Handcrafted with premium components."}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-12 md:mt-16">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={cn(
                  "w-full font-semibold py-3.5 text-sm uppercase tracking-wider rounded-none transition-all duration-200",
                  isAdded 
                    ? "bg-zinc-200 text-zinc-600 cursor-default" 
                    : "bg-white text-black hover:bg-zinc-200 active:scale-[0.99]"
                )}
              >
                {isAdded ? "added to bag ✓" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
