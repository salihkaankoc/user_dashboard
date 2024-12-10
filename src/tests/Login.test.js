import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { LoadingProvider } from '../contexts/LoadingContext';

describe('Login Component', () => {
  const renderLogin = () => {
    render(
      <BrowserRouter>
        <LoadingProvider>
          <Login />
        </LoadingProvider>
      </BrowserRouter>
    );
  };

  test('renders login form', () => {
    renderLogin();
    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
  });

  test('shows error on invalid login', async () => {
    renderLogin();
    
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'invalid@email.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'wrongpassword' },
    });
    
    fireEvent.click(screen.getByText(/Login/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
    });
  });
}); 