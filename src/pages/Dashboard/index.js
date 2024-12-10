import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginatedTable from '../../components/common/PaginatedTable';
import UserModal from '../../components/users/UserModal';
import UserService from '../../services/userService';
import AuthService from '../../services/authService';
import { useLoading } from '../../contexts/LoadingContext';
import { usePermissions } from '../../hooks/usePermissions';
import './Dashboard.css';
import { toast } from 'react-hot-toast';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  const navigate = useNavigate();
  const userService = UserService.getInstance();
  const authService = AuthService.getInstance();
  const { setIsLoading, setError } = useLoading();
  const permissions = usePermissions();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await userService.getUsers(currentPage, selectedRole, searchTerm);
      setUsers(response.users);
      setTotalPages(response.totalPages);
    } catch (error) {
      setError('Failed to fetch users')
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, selectedRole, searchTerm]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleSearch = async (value) => {
    setSearchTerm(value);
    try {
      setIsLoading(true);
      const response = await userService.getUsers(currentPage, selectedRole, value);
      setUsers(response.users || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      setError('Failed to search users');
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => handleSearch(value), 300),
    []
  );

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [currentPage, selectedRole]);

  const handleSaveUser = async (userData) => {
    try {
      setIsLoading(true);
      
      if (selectedUser) {
        await userService.updateUser(selectedUser.id, {
          name: userData.name,
          email: userData.email,
          role: userData.role
        });
        toast.success('User updated successfully');
      } else {
        await userService.createUser({
          name: userData.name,
          email: userData.email,
          role: userData.role,
          password: userData.password
        });
        toast.success('User created successfully');
      }
      
      setIsModalOpen(false);
      setSelectedUser(null);
      await fetchUsers();
    } catch (error) {
      toast.error(error.message || 'Failed to save user');
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setIsLoading(true);
      await userService.deleteUser(userToDelete.id);
      setShowDeleteModal(false);
      setUserToDelete(null);
      fetchUsers();
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to delete user');
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'role', 
      label: 'Role',
      render: (user) => (
        <span className={`role-badge ${user.role.toLowerCase()}`}>
          {user.role}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (user) => {
        if (!permissions.canEdit && !permissions.canDelete) return null;

        return (
          <div className="action-buttons">
            {permissions.canEdit && (
              <button
                onClick={() => handleEditUser(user)}
                className="btn-icon edit"
                title="Edit user"
              >
                <i className="fas fa-pen"></i>
              </button>
            )}
            {permissions.canDelete && (
              <button
                onClick={() => handleDeleteUser(user)}
                className="btn-icon delete"
                title="Delete user"
              >
                <i className="fas fa-trash"></i>
              </button>
            )}
          </div>
        );
      }
    }
  ];

  const renderCreateButton = () => {
    if (!permissions.canCreate) return null;

    return (
      <button onClick={handleCreateUser} className="btn-create">
        <i className="fas fa-plus"></i>
        Create User
      </button>
    );
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <i className="fas fa-users-cog"></i>
          <span>User Management</span>
        </div>
        <div className="nav-actions">
          <span className="user-info">
            <i className="fas fa-user"></i>
            {authService.getUser()?.name}
          </span>
          <button onClick={handleLogout} className="btn-logout">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <div className="header-title">
              <h1>Users</h1>
              {renderCreateButton()}
            </div>
            <div className="header-actions">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input 
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
              <div className="filter-box">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
            </div>
          </div>

          <div className="users-table">
            <PaginatedTable
              columns={columns}
              data={users}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>

      {isModalOpen && permissions.canEdit && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            setIsModalOpen(false);
          }}
          onSave={handleSaveUser}
        />
      )}

      {showDeleteModal && permissions.canDelete && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <h2>Delete User</h2>
            <p>Are you sure you want to delete {userToDelete?.name}?</p>
            <div className="modal-actions">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Dashboard; 