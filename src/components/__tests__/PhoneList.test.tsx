import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhoneList } from '../PhoneList';
import { getPhones } from '../../services/api';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../services/api');

describe('PhoneList', () => {
  const mockPhones = [
    { id: 1, brand: 'Apple', model: 'iPhone 13', price: 999, image: 'iphone.jpg' },
    { id: 2, brand: 'Samsung', model: 'Galaxy S21', price: 899, image: 'galaxy.jpg' }
  ];

  beforeEach(() => {
    vi.mocked(getPhones).mockResolvedValue(mockPhones);
  });

  it('renders loading state initially', () => {
    render(<PhoneList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders phones after loading', async () => {
    render(<PhoneList />);
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Samsung')).toBeInTheDocument();
    });
  });

  it('filters phones based on search input', async () => {
    render(<PhoneList />);
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search phones...');
    await userEvent.type(searchInput, 'samsung');

    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });
});