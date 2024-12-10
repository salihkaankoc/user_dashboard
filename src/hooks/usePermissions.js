import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export const usePermissions = () => {
  const { user } = useContext(AuthContext);

  const permissions = {
    canView: ['Admin', 'Editor', 'Viewer'],
    canCreate: ['Admin'],
    canEdit: ['Admin', 'Editor'],
    canDelete: ['Admin']
  };

  return {
    canView: permissions.canView.includes(user?.role),
    canCreate: permissions.canCreate.includes(user?.role),
    canEdit: permissions.canEdit.includes(user?.role),
    canDelete: permissions.canDelete.includes(user?.role)
  };
}; 