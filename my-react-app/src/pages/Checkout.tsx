import { useState } from "react";
import { useCart } from "@/context/CardContext";
import { toast } from "sonner";

interface ShippingDetails {
  fullName: string;
  emailAddress: string;
  shippingAddress: string;
  phoneNumber: string;
}

interface PaymentDetails {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

interface CheckoutProps {
  onViewChange: (view: string) => void;
}

export default function Checkout({ onViewChange }: CheckoutProps) {
  const { cartSubtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: "",
    emailAddress: "",
    shippingAddress: "",
    phoneNumber: "",
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const handlePlaceOrder = () => {
    // 1. Shipping Details - Full Name
    const nameTrimmed = shippingDetails.fullName.trim();
    if (!nameTrimmed || !/^[a-zA-Z\s]+$/.test(nameTrimmed)) {
      return toast.error("full name must only contain letters.");
    }

    // 2. Shipping Details - Email Address
    const emailTrimmed = shippingDetails.emailAddress.trim();
    if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      return toast.error("please enter a valid email address.");
    }

    // 3. Shipping Details - Shipping Address
    if (!shippingDetails.shippingAddress.trim()) {
      return toast.error("please enter a shipping address.");
    }

    // 4. Shipping Details - Phone Number
    const phoneDigits = shippingDetails.phoneNumber.replace(/\D/g, '');
    if (!shippingDetails.phoneNumber.trim() || phoneDigits.length < 10 || phoneDigits.length > 15) {
      return toast.error("please enter a valid phone number (10-15 digits).");
    }

    // 5. Payment Method - Cardholder Name
    const cardholderTrimmed = paymentDetails.cardholderName.trim();
    if (!cardholderTrimmed || !/^[a-zA-Z\s]+$/.test(cardholderTrimmed)) {
      return toast.error("cardholder name must only contain letters.");
    }

    // 6. Payment Method - Card Number
    const sanitizedCard = paymentDetails.cardNumber.replace(/\s+/g, '');
    if (!paymentDetails.cardNumber.trim() || !/^\d{16}$/.test(sanitizedCard)) {
      return toast.error("card number must be exactly 16 digits.");
    }

    // 7. Payment Method - Expiry Date
    const expiryTrimmed = paymentDetails.expiryDate.trim();
    if (!expiryTrimmed || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryTrimmed)) {
      return toast.error("expiry format must be mm/yy.");
    }

    // 8. Payment Method - CVC
    const cvcTrimmed = paymentDetails.cvc.trim();
    if (!cvcTrimmed || !/^\d{3,4}$/.test(cvcTrimmed)) {
      return toast.error("cvc must be 3 or 4 digits.");
    }

    setIsProcessing(true);
    console.log("Order Placed:", { shippingDetails, paymentDetails });
    setTimeout(() => {
      setIsProcessing(false);
      toast("order placed successfully. thank you.");
      clearCart();
      onViewChange("home");
    }, 1500);
  };

  return (
    <main className="container mx-auto px-4 py-24 md:py-32 flex flex-col justify-start">
      <h1 className="text-3xl font-bold tracking-tight text-center mx-auto mb-10 lowercase text-white">
        checkout details
      </h1>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-start px-4">
        {/* Left Column: Form Cards */}
        <div className="md:col-span-2 flex flex-col gap-6">

          {/* ── Shipping Details Card ── */}
          <div className="bg-[#1a1a1a] border border-zinc-800/50 p-6 md:p-8 rounded-xl flex flex-col gap-6">
            <h2 className="text-xl font-bold tracking-tight lowercase text-white">
              shipping details
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="full name"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-none text-white placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-colors lowercase"
                value={shippingDetails.fullName}
                onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
              />
              <input
                type="email"
                placeholder="email address"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-none text-white placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-colors lowercase"
                value={shippingDetails.emailAddress}
                onChange={(e) => setShippingDetails({ ...shippingDetails, emailAddress: e.target.value })}
              />
              <input
                type="text"
                placeholder="shipping address"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-none text-white placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-colors lowercase"
                value={shippingDetails.shippingAddress}
                onChange={(e) => setShippingDetails({ ...shippingDetails, shippingAddress: e.target.value })}
              />
              <input
                type="tel"
                placeholder="phone number"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-none text-white placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-colors lowercase"
                value={shippingDetails.phoneNumber}
                onChange={(e) => setShippingDetails({ ...shippingDetails, phoneNumber: e.target.value })}
              />
            </div>
          </div>

          {/* ── Payment Method Card ── */}
          <div className="bg-[#1a1a1a] border border-zinc-800/50 p-6 md:p-8 rounded-xl flex flex-col gap-6">
            <h2 className="text-xl font-bold tracking-tight lowercase text-white">
              payment method
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="cardholder name"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-none text-white placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-colors lowercase"
                value={paymentDetails.cardholderName}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardholderName: e.target.value })}
              />
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-none text-white placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-colors lowercase"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="mm/yy"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-none text-white placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-colors lowercase"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="cvc"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-none text-white placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-colors lowercase"
                  value={paymentDetails.cvc}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-[#1a1a1a] border border-zinc-800/50 p-6 md:p-8 rounded-xl flex flex-col gap-8 sticky top-24">
            <h2 className="text-xl font-bold tracking-tight lowercase text-white">
              order summary
            </h2>

            <div className="flex flex-col gap-4 text-sm font-light text-zinc-300 tracking-wide">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="text-white font-normal">
                  £{cartSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="text-white font-normal">free</span>
              </div>
            </div>

            <div className="border-t border-zinc-800/50 pt-6 mt-2">
              <div className="flex justify-between items-center text-base md:text-lg font-medium text-white">
                <span className="text-sm font-bold tracking-tight text-white">
                  Estimated Total
                </span>
                <span>£{cartSubtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-white text-black font-semibold text-sm py-4 uppercase tracking-wider text-center block hover:bg-zinc-200 transition-colors cursor-pointer mt-4 rounded-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? "processing..." : "place order"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
