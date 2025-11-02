import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Package, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const orderId = `SKS${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="text-center shadow-2xl">
            <CardContent className="pt-12 pb-8">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Order Placed Successfully! 🎉
                </h1>
                <p className="text-muted-foreground mb-6">
                  Thank you for your order. We'll deliver your items soon.
                </p>
              </motion.div>

              {/* Order Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-muted/50 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Package className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Order ID: {orderId}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  You will receive a confirmation call within 2 hours
                </p>
              </motion.div>

              {/* What's Next */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-4 mb-8"
              >
                <h3 className="font-semibold text-foreground">What happens next?</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <span>Order confirmation call within 2 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <span>Preparation and packaging</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <span>Delivery to your address</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <span>Pay on delivery (COD)</span>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="space-y-3"
              >
                <Link to="/" className="block">
                  <Button size="lg" className="w-full btn-primary">
                    <Home className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
                
                <Link to="/contact" className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </Link>
              </motion.div>

              {/* Support Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-8 pt-6 border-t border-border"
              >
                <p className="text-xs text-muted-foreground">
                  Need help? Contact us at{' '}
                  <span className="text-primary font-medium">+91 12345 67890</span>
                  <br />
                  or email{' '}
                  <span className="text-primary font-medium">support@smartkisanshakti.com</span>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Celebration Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-8"
        >
          <span className="text-4xl">🌾🚜✨</span>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;