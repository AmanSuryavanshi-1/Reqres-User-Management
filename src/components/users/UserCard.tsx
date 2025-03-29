
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Edit, Trash2, User } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface UserCardProps {
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  onDelete: (id: number) => Promise<void>;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/users/${user.id}/edit`);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(user.id);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        layout
      >
        <Card className="overflow-hidden hover-lift border">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 rounded-lg">
                <AvatarImage src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                <AvatarFallback className="rounded-lg">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold truncate">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                
                <div className="flex items-center gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="group flex items-center gap-1"
                    onClick={handleEdit}
                  >
                    <Edit size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>Edit</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="group flex items-center gap-1"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 size={16} className="text-muted-foreground group-hover:text-destructive transition-colors" />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {user.first_name} {user.last_name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-current animate-spin" />
                  Deleting...
                </div>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserCard;
