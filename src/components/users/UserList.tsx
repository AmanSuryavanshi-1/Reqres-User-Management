import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserCard from './UserCard';
import SearchBar from '../ui/SearchBar';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUsers, deleteUser, setSearchQuery, setCurrentPage } from '../../store/slices/usersSlice';
import type { RootState } from '../../store';

interface UserListProps {}

const UserList: React.FC<UserListProps> = () => {
  const dispatch = useAppDispatch();
  const { users, loading, currentPage, totalPages, searchQuery } = useAppSelector((state: RootState) => state.users);
  const location = useLocation();

  // Effect to refetch users when returning from edit page
  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [currentPage, location.key, dispatch]); // Adding location.key will cause a refetch when navigating back

  const handleDeleteUser = async (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    
    return users.filter(user => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      const email = user.email.toLowerCase();
      const query = searchQuery.toLowerCase();
      
      return fullName.includes(query) || email.includes(query);
    });
  }, [users, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-6">
      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Search by name or email..." 
        className="w-full md:w-[320px]"
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Loading users...</p>
          </motion.div>
        </div>
      ) : (
        <>
          {filteredUsers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No users found matching your search criteria.</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredUsers.map(user => (
                  <UserCard 
                    key={user.id} 
                    user={user} 
                    onDelete={handleDeleteUser} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!searchQuery && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}
                disabled={currentPage === 1 || loading}
                className="flex items-center gap-1"
              >
                <ChevronLeft size={16} />
                Previous
              </Button>
              
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))}
                disabled={currentPage === totalPages || loading}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;
