import { mockAPI } from './api';

class UserService {
  static instance = null;
  
  constructor() {
    this.users = [
      { 
        id: 1, 
        name: 'John Doe', 
        email: 'john@example.com', 
        role: 'Admin',
        createdAt: '2024-01-15'
      },
      { 
        id: 2, 
        name: 'Jane Smith', 
        email: 'jane@example.com', 
        role: 'Editor',
        createdAt: '2024-01-16'
      },
      { 
        id: 3, 
        name: 'Mike Johnson', 
        email: 'mike@example.com', 
        role: 'Viewer',
        createdAt: '2024-01-17'
      },
      { 
        id: 4, 
        name: 'Sarah Wilson', 
        email: 'sarah@example.com', 
        role: 'Editor',
        createdAt: '2024-01-18'
      },
      { 
        id: 5, 
        name: 'Tom Brown', 
        email: 'tom@example.com', 
        role: 'Viewer',
        createdAt: '2024-01-19'
      }
    ];
  }
  
  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getUsers(page = 1, role = '', searchTerm = '') {
    try {
      let filteredUsers = [...this.users];

      if (searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        filteredUsers = filteredUsers.filter(user => 
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
        );
      }

      if (role) {
        filteredUsers = filteredUsers.filter(user => 
          user.role === role
        );
      }

      const itemsPerPage = 10;
      const startIndex = (page - 1) * itemsPerPage;
      const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

      return {
        users: paginatedUsers,
        totalPages: Math.ceil(filteredUsers.length / itemsPerPage),
        totalUsers: filteredUsers.length
      };
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  async updateUser(id, userData) {
    try {
      const index = this.users.findIndex(user => user.id === id);
      if (index === -1) throw new Error('User not found');
      
      this.users[index] = {
        ...this.users[index],
        name: userData.name || this.users[index].name,
        email: userData.email || this.users[index].email,
        role: userData.role || this.users[index].role
      };

      return this.users[index];
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  async deleteUser(id) {
    try {
      const index = this.users.findIndex(user => user.id === id);
      if (index === -1) throw new Error('User not found');
      
      this.users = this.users.filter(user => user.id !== id);
      return true;
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }

  async createUser(userData) {
    try {
      const newUser = {
        id: Math.max(...this.users.map(u => u.id)) + 1,
        ...userData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      this.users.push(newUser);
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }
}

export default UserService; 