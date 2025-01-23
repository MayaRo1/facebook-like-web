import { render, fireEvent, waitFor } from '@testing-library/react';
import Signup from './Signup';
import { BrowserRouter } from 'react-router-dom';

// mock
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Signup Component', () => {
  test('submit signup form correctly', async () => {
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    // fill form correctly
    fireEvent.change(getByPlaceholderText('Username'), { target: {value: 'username' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: {value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Verify Password'), {target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Nickname'), { target: {value: 'Nickname' } });

    // Click the sign up button
    fireEvent.click(getByText('Sign Up'));

    // Assert sessionStorage was called; might need mocks to check this
    // waitFor or expect assertions here to verify the outcome
  });

});
describe('Signup Component', () => {
    // Mock global alert
    global.alert = jest.fn();

    test('alerts user when passwords do not match', async () => {
      const { getByPlaceholderText, getByText } = render(
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      );


      // fill form without photo
      fireEvent.change(getByPlaceholderText('Username'), { target: {value: 'username' } });
      fireEvent.change(getByPlaceholderText('Password'), { target: {value: 'password123' } });
      fireEvent.change(getByPlaceholderText('Verify Password'), {target: { value: 'password123' } });
      fireEvent.change(getByPlaceholderText('Nickname'), { target: {value: 'Nickname' } });


      // Click the sign up button
      fireEvent.click(getByText('Sign Up'));

      // Check for alert message
      expect(global.alert).toHaveBeenCalledWith('All fields are required.');
    });

    // Clear mock
    afterEach(() => {
      global.alert.mockClear();
    });
  });
