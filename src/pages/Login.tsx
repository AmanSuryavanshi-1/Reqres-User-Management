
import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';
import { pageTransition } from '../utils/animations';

const Login: React.FC = () => {
  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
          >
            <div className="text-primary text-xl font-semibold">RM</div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-2xl font-semibold text-center"
          >
            Reqres Manager
          </motion.h1>
        </div>
        
        <LoginForm />
      </div>
    </motion.div>
  );
};

export default Login;
