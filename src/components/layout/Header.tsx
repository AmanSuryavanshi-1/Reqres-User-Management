
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  
  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-lg border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className="flex items-center"
        >
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Reqres User Manager
          </h1>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {isAuthenticated && (
            <motion.div
              key="auth-buttons"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={headerVariants}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-primary/10">
                  <AvatarFallback className="bg-primary text-white">
                    {user?.email?.charAt(0)?.toUpperCase() || <User size={16} />}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:block">
                  {user?.email || 'User'}
                </span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="flex items-center gap-1 hover-lift"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline-block ml-1">Logout</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
