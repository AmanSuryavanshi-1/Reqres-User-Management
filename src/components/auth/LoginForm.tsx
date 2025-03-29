
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { fadeAnimation, slideUpAnimation } from '../../utils/animations';
import { User, Lock } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, loading } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await login(email, password);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeAnimation}
      className="w-full max-w-md mx-auto"
    >
      <Card className="border-none shadow-lg overflow-hidden glass-card">
        <CardHeader className="space-y-2 pb-6">
          <motion.div variants={slideUpAnimation}>
            <CardTitle className="text-3xl font-semibold tracking-tight text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center pt-1.5">
              Enter your credentials to access your account
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.form
            variants={slideUpAnimation}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <User size={16} className="text-muted-foreground" />
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="eve.holt@reqres.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`focus-ring h-11 ${errors.email ? 'border-destructive' : ''}`}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock size={16} className="text-muted-foreground" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`focus-ring h-11 ${errors.password ? 'border-destructive' : ''}`}
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-sm mt-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full h-11 font-medium button-bounce"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
                  Logging in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Demo Credentials:</p>
              <p className="font-mono">Email: eve.holt@reqres.in</p>
              <p className="font-mono">Password: cityslicka</p>
            </div>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LoginForm;
