import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Topmenu from './Topmenu';
import Login from '../login/Login';

describe('Topmenu', () => {
  test('logout button navigates to home page', async () => {
    Storage.prototype.setItem = jest.fn();
    render(
      <MemoryRouter initialEntries={['/initial']}>
        <Routes>
          <Route path="/initial" element={<Topmenu isDarkMode={false} />} />
          <Route path="/" element={<Login isDarkMode={false} />} />
        </Routes>
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await userEvent.click(logoutButton);

    // check that logout brought as to home page
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('isAuthenticated', 'false');
    expect(window.location.pathname).toBe('/');
  });
});


