import { cn } from "@/lib/utils";
import { AspectRatio } from "@/ui/aspect-ratio";
import { useCart } from "@/context/CardContext";
import { ShoppingBag } from "lucide-react";

interface CartProps {
  onViewChange: (view: string) => void;
}

export default function Cart({ onViewChange }: CartProps) {
  const { cart, updateQuantity, removeFromCart, cartSubtotal } = useCart();

  return (
    <main className="container mx-auto px-4 py-24 md:py-32 flex flex-col justify-start">
      <h1 className="text-3xl font-bold tracking-tight text-center mx-auto mb-10 lowercase text-white">
        your shopping bag
      </h1>

      {cart.length === 0 ? (
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-[#1a1a1a] border border-zinc-800/50 p-6 md:p-8 rounded-sm h-[250px] flex flex-col justify-center items-center text-zinc-500 gap-3">
            <ShoppingBag className="w-8 h-8 opacity-70" />
            <p className="lowercase">your cart is empty.</p>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-start">
          {/* Left Column: Cart Items */}
          <div className="md:col-span-2 bg-[#1a1a1a] border border-zinc-800/50 p-6 md:p-8 rounded-sm flex flex-col gap-6">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "flex flex-col sm:flex-row gap-6",
                  index !== cart.length - 1 ? "border-b border-zinc-800/50 pb-6 mb-6" : ""
                )}
              >
                {/* Thumbnail */}
                <div className={cn("w-full sm:w-32 md:w-40 shrink-0 overflow-hidden", item.bgColor || "bg-zinc-800")}>
                  <AspectRatio ratio={3 / 4}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-1 py-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-white lowercase">
                      {item.title}
                    </h3>
                    <p className="text-lg font-light text-zinc-200">
                      £{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 mt-6 sm:mt-auto">
                    {/* Quantity Controller */}
                    <div className="flex items-center border border-zinc-800/70 text-sm rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.id, 'decrement')}
                        className="px-4 py-2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-white font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 'increment')}
                        className="px-4 py-2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest cursor-pointer"
                    >
                      remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Summary Panel */}
          <div className="md:col-span-1 bg-[#1a1a1a] border border-zinc-800/50 p-6 md:p-8 rounded-sm flex flex-col gap-8 sticky top-28">
            <h2 className="text-xl font-bold tracking-tight lowercase text-white">
              order summary
            </h2>

            <div className="flex flex-col gap-4 text-sm font-light text-zinc-300 tracking-wide">
              <div className="flex justify-between items-center">
                <span className="lowercase">subtotal</span>
                <span className="text-white">£{cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="lowercase">shipping</span>
                <span className="text-white">free</span>
              </div>
            </div>

            <div className="border-t border-zinc-800/50 pt-6 mt-2">
              <div className="flex justify-between items-center text-base md:text-lg font-medium text-white">
                <span className="text-xm font-bold tracking-tight lowercase text-white">estimated total</span>
                <span>£{cartSubtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onViewChange('checkout')}
              className="w-full bg-white text-black font-semibold text-sm py-4 uppercase tracking-wider text-center block hover:bg-zinc-200 transition-colors cursor-pointer mt-4 rounded-none"
            >
              proceed to checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
