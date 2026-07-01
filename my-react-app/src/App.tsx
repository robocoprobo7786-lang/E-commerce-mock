import { useState } from "react";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/context/CardContext";
import { Toaster } from "@/ui/sonner";

function App() {
  const [currentView, setCurrentView] = useState("home");

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#121212] text-white flex flex-col">
        <Navbar activeView={currentView} onViewChange={setCurrentView} />
        <div className="flex-1">
          {currentView === "cart" ? <Cart /> : <Home />}
        </div>
      </div>
      <Toaster 
        toastOptions={{
          className: "bg-zinc-900 border border-zinc-800 text-white rounded-sm",
        }}
      />
    </CartProvider>
  );
}

export default App;