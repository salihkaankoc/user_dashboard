export const mockUsers = {
  data: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      createdAt: "2024-01-15T10:00:00Z",
      lastLogin: "2024-03-20T08:30:00Z"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Editor",
      createdAt: "2024-01-20T11:00:00Z",
      lastLogin: "2024-03-19T14:20:00Z"
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "Viewer",
      createdAt: "2024-02-01T09:00:00Z",
      lastLogin: "2024-03-18T16:45:00Z"
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Editor",
      createdAt: "2024-02-15T13:00:00Z",
      lastLogin: "2024-03-20T09:15:00Z"
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Viewer",
      createdAt: "2024-03-01T15:30:00Z",
      lastLogin: "2024-03-19T11:30:00Z"
    }
  ],
  totalPages: 3,
  currentPage: 1,
  totalUsers: 5
};

export const mockCredentials = {
  admin: {
    email: "john@example.com",
    password: "Admin123!"
  },
  editor: {
    email: "jane@example.com",
    password: "Editor123!"
  },
  viewer: {
    email: "bob@example.com",
    password: "Viewer123!"
  }
};

export const mockAuth = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  refreshToken: "rt_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    permissions: ["create_user", "edit_user", "delete_user", "view_users"],
    lastLogin: "2024-03-20T08:30:00Z"
  }
}; 