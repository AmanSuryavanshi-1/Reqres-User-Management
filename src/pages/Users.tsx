
import React from 'react';
import { motion } from 'framer-motion';
import UserList from '../components/users/UserList';
import Header from '../components/layout/Header';
import { pageTransition } from '../utils/animations';

const Users: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <motion.main
        {...pageTransition}
        className="flex-1 container py-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">
            View, edit and manage your users
          </p>
        </motion.div>
        
        <UserList />
      </motion.main>
    </div>
  );
};

export default Users;
