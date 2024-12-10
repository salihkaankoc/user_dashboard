import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import './UserCard.css';

function UserCard({ user, onEdit, onDelete }) {
  const permissions = usePermissions();

  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="user-card-info">
          <span className="user-card-name">{user.name}</span>
          <span className="user-card-email">{user.email}</span>
          <div className="user-card-role">
            <span className={`role-badge ${user.role.toLowerCase()}`}>
              {user.role}
            </span>
          </div>
        </div>
      </div>
      <div className="user-card-actions">
        {permissions.canEdit && (
          <button
            onClick={() => onEdit(user)}
            className="btn-icon edit"
            title="Edit user"
            aria-label={`Edit ${user.name}`}
          >
            <i className="fas fa-edit"></i>
          </button>
        )}
        {permissions.canDelete && (
          <button
            onClick={() => onDelete(user)}
            className="btn-icon delete"
            title="Delete user"
            aria-label={`Delete ${user.name}`}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default UserCard; 