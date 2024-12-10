import { mockAPI } from './api';

class AuthService {
  static instance = null;
  user = null;

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email, password) {
    try {
      const response = await mockAPI.login({ email, password });
      const { token, user } = response.data;
      
      this.setSession(token, user);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  }

  setSession(token, user) {
    this.user = user;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    if (!this.user) {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
    return this.user;
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  logout() {
    this.user = null;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  hasPermission(permission) {
    const user = this.getUser();
    return user?.permissions?.includes(permission) || false;
  }

  hasRole(role) {
    const user = this.getUser();
    return user?.role === role;
  }

  canManageUsers() {
    const user = this.getUser();
    return user?.role === 'Admin' || user?.role === 'Editor';
  }

  canDeleteUsers() {
    return this.hasRole('Admin');
  }
}

export default AuthService; 