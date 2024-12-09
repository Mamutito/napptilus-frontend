import { render, screen } from '@testing-library/react';
import { PhoneCard } from '../PhoneCard';
import { describe, it, expect } from 'vitest';

describe('PhoneCard', () => {
  const mockPhone = {
    id: 1,
    brand: 'Apple',
    model: 'iPhone 13',
    price: 999,
    image: 'test-image.jpg'
  };

  it('renders phone information correctly', () => {
    render(<PhoneCard phone={mockPhone} />);
    
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.getByText('$999')).toBeInTheDocument();
    expect(screen.getByAltText('Apple iPhone 13')).toBeInTheDocument();
  });

  it('renders add to cart button', () => {
    render(<PhoneCard phone={mockPhone} />);
    
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });
});