import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Coffee, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import waynesLogo from '@/assets/waynes-logo.png';

const Login = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(t('login.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-coffee-latte via-coffee-cream to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-20 w-80 h-80 bg-coffee-mocha rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-8">
              <Coffee className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              {isRTL ? 'بوابة الامتياز' : 'Franchise Portal'}
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              {isRTL 
                ? 'قم بالوصول إلى موارد علامتك التجارية ووثائق التشغيل والمزيد'
                : 'Access your brand resources, operational documents, and more'
              }
            </p>
          </motion.div>
          
          {/* Decorative Coffee Beans Pattern */}
          <div className="absolute bottom-0 left-0 right-0 h-32 opacity-5">
            <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
              <pattern id="beans" patternUnits="userSpaceOnUse" width="20" height="20">
                <circle cx="10" cy="10" r="3" fill="currentColor" className="text-coffee-espresso" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#beans)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header with Language Toggle */}
        <div className="flex justify-end p-6">
          <LanguageToggle />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img 
                src={waynesLogo} 
                alt="Waynes Coffee" 
                className="h-12 object-contain"
              />
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                {t('login.title')}
              </h1>
              <p className="text-muted-foreground">
                {t('login.subtitle')}
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  {t('login.email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  className="h-12 bg-card border-border focus:border-primary transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  {t('login.password')}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                    className="h-12 bg-card border-border focus:border-primary transition-colors pe-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 end-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 shadow-medium hover:shadow-elevated"
              >
                {isLoading ? t('login.loading') : t('login.submit')}
              </Button>
            </form>

            {/* Demo Credentials Note */}
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {isRTL 
                ? 'تواصل مع المدير للحصول على بيانات الدخول'
                : 'Contact your administrator for login credentials'
              }
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
