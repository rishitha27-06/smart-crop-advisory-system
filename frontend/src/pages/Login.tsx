// frontend/src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      alert("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    // Get stored user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert("No user data found. Please sign up first.");
      setIsLoading(false);
      return;
    }

    try {
      const userData = JSON.parse(storedUser);

      // Validate credentials against stored data
      if (userData.email === formData.email.toLowerCase() && userData.password === formData.password) {
        // Store token and user data (assuming password is stored for simplicity)
        localStorage.setItem('token', 'dummy-token'); // You might want to generate a proper token
        localStorage.setItem('user', JSON.stringify(userData));

        // Dispatch custom event to update AuthContext
        window.dispatchEvent(new CustomEvent('authChange'));

        alert("Login successful!");
        navigate('/');
      } else {
        alert("Incorrect email or password!");
      }
    } catch (error) {
      console.error('Login validation error:', error);
      alert("Error validating credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background agriculture-pattern py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {t('login.title')}
            </CardTitle>
            <CardDescription>
              {t('login.subtitle')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('login.password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : t('login.loginButton')}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground mt-2">
              👉 Use <b>demo@gmail.com</b> / <b>123456</b>
            </p>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-primary font-medium hover:underline"
                >
                  Create one
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                <Link
                  to="/forgot-password"
                  className="text-primary font-medium hover:underline"
                >
                  Forgot your password?
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Join thousands of farmers using Smart Kisan Shakti
          </p>
          <div className="flex justify-center space-x-8 text-xs text-muted-foreground">
            <div>✓ Crop Trading</div>
            <div>✓ Equipment Rental</div>
            <div>✓ Expert Knowledge</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
