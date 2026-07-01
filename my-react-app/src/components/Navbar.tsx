import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CardContext";

const links = ["home", "cart", "orders", "logout"];

const MenuIcon = () => (
  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="2" />
    <line y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2" />
  </svg>
);

interface NavbarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Navbar({ activeView, onViewChange }: NavbarProps) {
  const { cartCount } = useCart();

  return (
    <nav className="w-full bg-[#121212] border-b border-zinc-900 sticky top-0 z-40 px-6 py-4 md:py-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="text-[#8b8bff] text-sm md:text-base font-semibold tracking-[0.3em] uppercase">
          YOLO
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => onViewChange(link)}
              className={cn(
                "lowercase text-base font-medium tracking-tight transition-colors duration-200 cursor-pointer",
                activeView === link
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              {link === "cart" && cartCount > 0 ? `cart (${cartCount})` : link}
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-zinc-400 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer">
                <MenuIcon />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#121212] border-r border-zinc-800 text-white p-8 w-[250px] flex flex-col justify-start gap-12"
            >
              <div className="text-[#8b8bff] text-sm md:text-base font-semibold tracking-[0.3em] uppercase">
                YOLO
              </div>
              <div className="flex flex-col gap-6 items-start">
                {links.map((link) => (
                  <button
                    key={link}
                    onClick={() => onViewChange(link)}
                    className={cn(
                      "lowercase text-base font-medium tracking-tight transition-colors duration-200 cursor-pointer text-left",
                      activeView === link
                        ? "text-white font-semibold"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    {link === "cart" && cartCount > 0 ? `cart (${cartCount})` : link}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
