import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ShoppingBag, 
  Heart, 
  QrCode, 
  Store, 
  LogOut, 
  Sliders, 
  ShieldCheck, 
  Volume2, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface ProfileViewProps {
  onOpenQRScanner: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenQRScanner }) => {
  const { navigate } = useRouter();
  const { currentUser, role, logout } = useAuth();
  const { openA11yModal } = useAccessibility();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isOwner = role === 'owner';

  return (
    <div className="py-4 sm:py-6 px-4 sm:px-6 max-w-2xl mx-auto space-y-6 pb-28">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-orange-500/20 flex-shrink-0">
            {currentUser?.fullName?.charAt(0) || currentUser?.name?.charAt(0) || 'U'}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 truncate">
                {currentUser?.fullName || currentUser?.name || 'Customer'}
              </h1>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-orange-100 text-orange-800">
                {role || 'Customer'}
              </span>
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser?.phone || '+91 98765 43210'}</span>
            </p>

            {currentUser?.email && (
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{currentUser.email}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Business Owner Switcher Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2 py-0.5 rounded bg-orange-500 text-[10px] font-extrabold uppercase tracking-wider text-white">
              Food Stall Partner
            </span>
            <h3 className="text-base font-black mt-1">Run a Food Stall or Canteen?</h3>
            <p className="text-xs text-slate-300 mt-0.5 max-w-sm">
              Manage digital queue tokens, receive live orders, and toggle items instantly.
            </p>
          </div>

          <button
            onClick={() => navigate(isOwner ? '/business' : '/setup-shop')}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-black shadow-xs flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <Store className="w-4 h-4 text-orange-600" />
            <span>{isOwner ? 'Open Stall Terminal' : 'Register Your Stall'}</span>
          </button>
        </div>
      </div>

      {/* Quick Menu Options */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden">
        <button
          onClick={() => navigate('/orders')}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Your Orders & Tokens</h4>
              <p className="text-[11px] text-slate-500">Live order status, past receipts & tokens</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => navigate('/saved')}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Saved Stalls</h4>
              <p className="text-[11px] text-slate-500">Your favorite local tapris and food counters</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onOpenQRScanner}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Scan Stall Counter QR</h4>
              <p className="text-[11px] text-slate-500">Instantly open stall menu and order</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={openA11yModal}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Accessibility & Audio Chimes</h4>
              <p className="text-[11px] text-slate-500">Voice token caller, high contrast, sound alerts</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full py-3.5 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>
    </div>
  );
};
