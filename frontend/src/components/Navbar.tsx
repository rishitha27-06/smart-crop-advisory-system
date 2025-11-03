import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Leaf, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const { state: cartState, removeItem, updateQuantity, getCartItemCount } = useCart();
  const { state: authState, logout } = useAuth();
  const { t } = useTranslation();
  const servicesRef = useRef<HTMLDivElement>(null);

  const mainNavigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.dashboard'), href: '/dashboard' },
  ];

  const servicesNavigation = [
    { name: t('nav.aiAdvisory'), href: '/advisory-chat' },
    { name: t('nav.cropMarket'), href: '/crop-market' },
    { name: t('nav.buyInputs'), href: '/buy-inputs' },
    { name: t('nav.machinery'), href: '/machinery' },
    { name: t('nav.knowledgeHub'), href: '/knowledge-center' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close services dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-green-200 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-18 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-green-600 group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300 shadow-md">
              <Leaf className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl text-gray-800 leading-tight">
                Smart Kisan
              </span>
              <span className="text-xs text-green-600 hidden sm:block font-medium">
                Crop Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-green-700 bg-green-100 shadow-sm border border-green-200'
                    : 'text-gray-600 hover:text-white hover:bg-green-600 border border-transparent hover:border-green-200 hover:shadow-md'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-white hover:bg-green-600 rounded-lg border border-transparent hover:border-green-200 transition-all duration-200 flex items-center space-x-1"
              >
                <span>{t('nav.services')}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white border border-green-200 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    {servicesNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-4 py-3 text-sm font-medium transition-all duration-200 ${
                          isActive(item.href)
                            ? 'text-green-700 bg-green-100'
                            : 'text-gray-700 hover:text-white hover:bg-green-600'
                        }`}
                        onClick={() => setIsServicesOpen(false)} // closes dropdown after click
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Feedback as separate link */}
            <Link
              to="/feedback"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/feedback')
                  ? 'text-green-700 bg-green-100 shadow-sm border border-green-200'
                  : 'text-gray-600 hover:text-white hover:bg-green-600 border border-transparent hover:border-green-200 hover:shadow-md'
              }`}
            >
              {t('nav.feedback')}
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <LanguageSelector />

            {/* Cart */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center animate-pulse font-medium">
                    {getCartItemCount() > 9 ? '9+' : getCartItemCount()}
                  </span>
                )}
              </Button>

              {/* Cart Dropdown */}
              <AnimatePresence>
                {isCartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 bg-white border border-green-200 rounded-xl shadow-2xl z-50"
                  >
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-3">Shopping Cart</h3>
                      {cartState.items.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                      ) : (
                        <>
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            {cartState.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-3 p-2 border rounded-lg">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{item.name}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, Math.max(1, item.quantity - 1)); }}
                                      className="h-6 w-6 p-0 text-xs"
                                    >
                                      -
                                    </Button>
                                    <span className="text-xs text-gray-500 min-w-[20px] text-center">{item.quantity}</span>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity + 1); }}
                                      className="h-6 w-6 p-0 text-xs"
                                    >
                                      +
                                    </Button>
                                  </div>
                                  <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-3 border-t">
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-semibold">Total:</span>
                              <span className="font-bold text-lg">₹{cartState.total}</span>
                            </div>
                            <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                              <Button className="w-full">
                                Proceed to Checkout
                              </Button>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile/Login */}
            <div className="flex items-center">
              {authState.user ? (
                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 p-2"
                  >
                    <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <User className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">{authState.user.name}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>

                  {/* Profile Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-green-200 rounded-xl shadow-2xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                      >
                        My Orders
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        {t('nav.logout')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                    {t('nav.login')}
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="p-2">
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-border shadow-lg"
          >
            <div className="px-3 py-3 space-y-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive(item.href)
                      ? 'text-green-700 bg-green-100'
                      : 'text-gray-700 hover:text-white hover:bg-green-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Services Mobile */}
              <div className="pt-2 pb-1">
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  {t('nav.services')}
                </p>
                {servicesNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-all ml-2 ${
                      isActive(item.href)
                        ? 'text-green-700 bg-green-100'
                        : 'text-gray-700 hover:text-white hover:bg-green-600'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Feedback Mobile */}
              <Link
                to="/feedback"
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  isActive('/feedback')
                    ? 'text-green-700 bg-green-100'
                    : 'text-gray-700 hover:text-white hover:bg-green-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.feedback')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
