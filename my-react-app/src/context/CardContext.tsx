import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';

export interface CartItem {
  id: string | number;
  title: string; // "name" in prompt, but product has "title"
  price: string | number;
  image: string;
  bgColor?: string; // Using optional since the prompt mentions it but it's not in the JSON
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string | number, type: 'increment' | 'decrement') => void;
  removeFromCart: (id: string | number) => void;
  cartCount: number;
  cartSubtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string | number, type: 'increment' | 'decrement') => {
    setCart((prevCart) => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = type === 'increment' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id: string | number) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      let numericPrice = 0;
      if (typeof item.price === 'string') {
        numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
      } else {
        numericPrice = item.price;
      }
      return total + (numericPrice * item.quantity);
    }, 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, cartCount, cartSubtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
