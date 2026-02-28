import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import carsReducer from '../../redux/Slices/carsSlice';
import wishlistReducer from '../../redux/Slices/wishlistSlice';
import Wishlist from '../../pages/Wishlist';

/**
 * Inlined helper to wrap components in Redux and Router providers.
 */
function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        cars: carsReducer,
        wishlist: wishlistReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Mock components
vi.mock('../../Components/Navbar', () => ({
  default: () => <div data-testid="navbar">Navbar</div>
}));

vi.mock('../../Components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>
}));

describe('Wishlist Page Unit Tests', () => {
  it('renders empty state when there are no items', () => {
    renderWithProviders(<Wishlist />, {
      preloadedState: {
        wishlist: { items: [], total: 0 }
      }
    });

    expect(screen.getByText(/Your Wishlist is Empty/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Explore Cars/i })).toBeInTheDocument();
  });

  it('renders wishlist items when data is present', () => {
    const mockItems = [
      { 
        id: '1', 
        brand: 'Porsche', 
        model: 'Taycan', 
        pricePerDay: 600, 
        image: 'porsche.jpg',
        transmission: 'Auto',
        fuel: 'Electric',
        seats: 4
      }
    ];

    renderWithProviders(<Wishlist />, {
      preloadedState: {
        wishlist: { items: mockItems, total: 1 }
      }
    });

    expect(screen.getByText('Porsche')).toBeInTheDocument();
    expect(screen.getByText('Taycan')).toBeInTheDocument();
    expect(screen.getByText(/600/)).toBeInTheDocument();
  });

  it('renders navigation button back to gallery (empty state)', () => {
    renderWithProviders(<Wishlist />, {
      preloadedState: {
        wishlist: { items: [], total: 0 }
      }
    });
    expect(screen.getByRole('button', { name: /Explore Cars/i })).toBeInTheDocument();
  });

  it('renders navigation button in header when items exist', () => {
    renderWithProviders(<Wishlist />, {
      preloadedState: {
        wishlist: { items: [{ id: '1', brand: 'X', model: 'Y' }], total: 1 }
      }
    });

    expect(screen.getByText(/Back to Cars/i)).toBeInTheDocument();
  });
});
