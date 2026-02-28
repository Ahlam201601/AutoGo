import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import carsReducer from '../../redux/Slices/carsSlice';
import wishlistReducer from '../../redux/Slices/wishlistSlice';
import Home from '../../pages/Home';

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

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
}));

describe('Home Page Unit Tests', () => {
  it('renders the hero title correctly', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByText((content, element) => {
      const hasText = (node) => node.textContent === "Experience Pure Luxury";
      const nodeHasText = hasText(element);
      const childrenDontHaveText = Array.from(element.children).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    })).toBeInTheDocument();
  });

  it('displays the loading state when car status is loading', () => {
    renderWithProviders(<Home />, {
      preloadedState: {
        cars: { cars: [], status: 'loading' }
      }
    });

    expect(screen.getByText(/Loading our finest selection/i)).toBeInTheDocument();
  });

  it('renders section headers like "Exclusive Services"', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Exclusive/i)).toBeInTheDocument();
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
  });

  it('renders the "Explore Cars" link', () => {
    renderWithProviders(<Home />);
    const link = screen.getByRole('link', { name: /Explore Cars/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/cars');
  });
});
