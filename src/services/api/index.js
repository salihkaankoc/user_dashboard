import axios from 'axios';
import { mockUsers, mockCredentials } from '../../data/mockData';


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';


const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});


api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


const mockAPI = {
  async login({ email, password }) {
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = Object.values(mockCredentials).find(
      cred => cred.email === email && cred.password === password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return { data: { token: 'mock-token', user } };
  },

  async getUsers(page = 1, role = '') {
    await new Promise(resolve => setTimeout(resolve, 600));

    let filteredUsers = [...mockUsers.data];
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    const perPage = 5;
    const start = (page - 1) * perPage;
    const paginatedUsers = filteredUsers.slice(start, start + perPage);

    return {
      data: {
        users: paginatedUsers,
        totalPages: Math.ceil(filteredUsers.length / perPage),
        currentPage: page,
        totalUsers: filteredUsers.length
      }
    };
  },

  async createUser(userData) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser = {
      id: mockUsers.data.length + 1,
      ...userData,
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    mockUsers.data.push(newUser);
    return { data: newUser };
  },

  async updateUser(id, userData) {
    await new Promise(resolve => setTimeout(resolve, 800));

    const userIndex = mockUsers.data.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    mockUsers.data[userIndex] = {
      ...mockUsers.data[userIndex],
      ...userData,
    };

    return { data: mockUsers.data[userIndex] };
  },

  async deleteUser(id) {
    await new Promise(resolve => setTimeout(resolve, 800));

    const userIndex = mockUsers.data.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    mockUsers.data.splice(userIndex, 1);
    return { data: { success: true } };
  }
};

export { api, mockAPI }; 