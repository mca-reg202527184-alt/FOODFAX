import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { Order, OrderType, PaymentMethod } from '../types';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Store, 
  CheckCircle2, 
  CreditCard, 
  Banknote, 
  Utensils, 
  ShoppingBag,
  Sparkles,
  QrCode,
  PartyPopper,
  ReceiptText,
  MapPin,
  ChevronRight
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { navigate, goBack } = useRouter();
  const { currentUser } = useAuth();
  const { items, shopId, shopName, shopImage, subtotal, clearCart } = useCart();

  const [orderType, setOrderType] = useState<OrderType>('TAKEAWAY');
  const [tableNumber, setTableNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH_AT_COUNTER');
  const [instructions, setInstructions] = useState('');
  const [customerName, setCustomerName] = useState(currentUser?.fullName || currentUser?.name || 'Guest Customer');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // If order was just placed, show confirmation popup screen
  if (confirmedOrder) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
        <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 space-y-6 text-center relative overflow-hidden">
          {/* Subtle decorative background glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

          {/* Success Badge */}
          <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black tracking-wider uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Payment & Order Successful
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight pt-2">
              Order Placed & Confirmed! 🎉
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              Your token has been generated and sent to the stall kitchen terminal.
            </p>
          </div>

          {/* Token Highlight Card */}
          <div className="p-5 rounded-2xl bg-orange-50/80 border border-orange-200 text-center space-y-2">
            <div className="text-[11px] font-bold text-orange-700 tracking-wider uppercase">
              Your Counter Token Number
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-orange-600 tracking-tight">
              {confirmedOrder.tokenNumber}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 pt-1">
              <Store className="w-3.5 h-3.5 text-orange-500" />
              <span>{confirmedOrder.shopName}</span>
              <span>•</span>
              <span className="capitalize">
                {confirmedOrder.orderType === 'DINE_IN' 
                  ? `Dine-In (${confirmedOrder.tableNumber || 'Table'})` 
                  : 'Takeaway'}
              </span>
            </div>
          </div>

          {/* Order Snapshot */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-700 border-b border-slate-200/60 pb-2">
              <span>Order ID: <span className="font-mono text-slate-900">{confirmedOrder.id}</span></span>
              <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                {confirmedOrder.paymentStatus}
              </span>
            </div>
            <div className="space-y-1 pt-1 max-h-36 overflow-y-auto pr-1">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-slate-600">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-semibold text-slate-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-black text-slate-900 text-sm">
              <span>Total Amount</span>
              <span className="text-orange-600">₹{confirmedOrder.total}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => navigate(`/order/${confirmedOrder.id}`)}
              className="w-full py-3.5 px-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Track Live Order & Token</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/orders')}
              className="w-full py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ReceiptText className="w-4 h-4 text-slate-600" />
              <span>View All My Orders</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 px-4 max-w-md mx-auto text-center">
        <h2 className="text-xl font-black text-slate-900 mb-2">No items in cart</h2>
        <p className="text-xs text-slate-500 mb-6">Add items from a food stall first.</p>
        <button
          onClick={() => navigate('/shops')}
          className="px-5 py-2.5 bg-orange-500 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-orange-600"
        >
          Browse Stalls
        </button>
      </div>
    );
  }

  const grandTotal = subtotal;

  const handlePlaceOrder = async () => {
    if (!shopId) return;
    if (orderType === 'DINE_IN' && !tableNumber.trim()) {
      setErrorMessage('Please enter your table number for Dine-In orders.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMessage('Please enter your contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const orderItems = items.map(({ menuItem, quantity }) => ({
        id: `item-${Date.now()}-${menuItem.id}`,
        menuItemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity,
        isVeg: menuItem.isVeg,
      }));

      const newOrder = await orderService.createOrder({
        shopId,
        shopName: shopName || 'Food Stall',
        shopImage: shopImage || undefined,
        shopLocation: 'Local Counter Stall',
        customerId: currentUser?.id || `cust-${Date.now().toString().slice(-6)}`,
        customerName: customerName.trim() || 'Guest Customer',
        customerPhone: customerPhone.trim(),
        orderType,
        tableNumber: orderType === 'DINE_IN' ? tableNumber.trim() : undefined,
        paymentMethod,
        items: orderItems,
        subtotal,
        total: grandTotal,
        estimatedPreparationMinutes: '5-10',
        instructions: instructions.trim() || undefined,
      });

      // Clear Cart state instantly as requested
      clearCart();

      // Show confirmation popup on customer screen
      setConfirmedOrder(newOrder);
    } catch (err: any) {
      console.error('Failed to place order:', err);
      setErrorMessage(err?.message || 'Could not place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-4 sm:py-6 px-4 sm:px-6 max-w-3xl mx-auto space-y-5 pb-28">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={goBack}
          className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-900">Checkout & Token Confirmation</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Stall: <strong className="text-slate-800">{shopName}</strong>
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
          {errorMessage}
        </div>
      )}

      {/* Order Type Selection */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3">
        <h2 className="font-bold text-sm text-slate-900">1. Select Order Type</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setOrderType('TAKEAWAY')}
            className={`p-3.5 rounded-xl border-2 text-left transition-all ${
              orderType === 'TAKEAWAY'
                ? 'border-orange-500 bg-orange-50/40 text-orange-950 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <ShoppingBag className={`w-4 h-4 ${orderType === 'TAKEAWAY' ? 'text-orange-600' : 'text-slate-500'}`} />
              <span className="font-bold text-sm">Takeaway / Parcel</span>
            </div>
            <p className="text-[11px] text-slate-500">Pick up at stall counter when ready</p>
          </button>

          <button
            type="button"
            onClick={() => setOrderType('DINE_IN')}
            className={`p-3.5 rounded-xl border-2 text-left transition-all ${
              orderType === 'DINE_IN'
                ? 'border-orange-500 bg-orange-50/40 text-orange-950 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Utensils className={`w-4 h-4 ${orderType === 'DINE_IN' ? 'text-orange-600' : 'text-slate-500'}`} />
              <span className="font-bold text-sm">Dine-in Table</span>
            </div>
            <p className="text-[11px] text-slate-500">Served right to your table or counter bar</p>
          </button>
        </div>

        {orderType === 'DINE_IN' && (
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Table / Counter Seat Number *
            </label>
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="e.g. Table 4, Counter Seat 2"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Customer Info */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3">
        <h2 className="font-bold text-sm text-slate-900">2. Customer Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Cooking Instructions (Optional)
          </label>
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g. Extra chutney, less spicy, well toasted"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3">
        <h2 className="font-bold text-sm text-slate-900">3. Payment Preference</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod('CASH_AT_COUNTER')}
            className={`p-3.5 rounded-xl border-2 text-left transition-all ${
              paymentMethod === 'CASH_AT_COUNTER'
                ? 'border-orange-500 bg-orange-50/40 text-orange-950 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Banknote className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-sm">Pay Cash at Counter</span>
            </div>
            <p className="text-[11px] text-slate-500">Pay when your token is called</p>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('PAY_ONLINE')}
            className={`p-3.5 rounded-xl border-2 text-left transition-all ${
              paymentMethod === 'PAY_ONLINE'
                ? 'border-orange-500 bg-orange-50/40 text-orange-950 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <QrCode className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-sm">UPI / Online Pay</span>
            </div>
            <p className="text-[11px] text-slate-500">Scan Stall QR or Google Pay / PhonePe</p>
          </button>
        </div>
      </div>

      {/* Order Summary & Token Generator CTA */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>Items in Order ({items.length})</span>
          <span className="font-bold text-slate-900">₹{grandTotal}</span>
        </div>
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-sm font-black text-slate-900">
          <span>Grand Total</span>
          <span className="text-base text-orange-600">₹{grandTotal}</span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={isSubmitting}
        className="w-full py-4 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white font-black text-base shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Generating Order Token...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Generate Order Token (₹{grandTotal})</span>
          </>
        )}
      </button>
    </div>
  );
};
