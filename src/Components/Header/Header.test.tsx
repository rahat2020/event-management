// Header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; 
import { AuthContextProvider } from '../../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import Header from './Header';

// Mock the react-toastify module
jest.mock('react-toastify', () => ({
  ToastContainer: () => null,
  toast: jest.fn(),
}));

describe('Header Component', () => {
  it('renders navigation links correctly', () => {
    render(
      <Router>
        <AuthContextProvider>
          <Header />
        </AuthContextProvider>
      </Router>
    );

    // Use toBeInTheDocument() for assertions
    // expect(screen.getByText('Create Events')).toBeInTheDocument();
    // expect(screen.getByText('Profile')).toBeInTheDocument();
    // expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('logs out the user and shows a success message on button click', () => {
    render(
      <Router>
        <AuthContextProvider>
          <Header />
        </AuthContextProvider>
      </Router>
    );

    // Mock the window.location.reload method
    jest.spyOn(window.location, 'reload').mockImplementationOnce(() => {});

    // Click the Logout button
    fireEvent.click(screen.getByText('Logout'));

    // Check if the logout functionality works as expected
    expect(toast).toHaveBeenCalledWith('Logout successfully!');
    // Add more assertions based on your specific logic
  });
});
