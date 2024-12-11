import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Cart from "../Cart";
import { useStore } from "../../hooks/useStore";

vi.mock("../../hooks/useStore");

const mockStore = {
  cart: [],
  phones: [],
  removeFromCart: vi.fn(),
  addToCart: vi.fn(),
  getPhoneById: vi.fn(),
};

describe("Cart", () => {
  it("renders empty cart message when cart is empty", () => {
    vi.mocked(useStore).mockReturnValue(mockStore);

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("renders cart items correctly", () => {
    const mockCart = [
      {
        id: "1",
        name: "iPhone 12",
        brand: "Apple",
        imageUrl: "/images/iphone12.jpg",
        selectedStorage: "128GB",
        selectedColor: "Black",
        basePrice: 799,
      },
    ];
    vi.mocked(useStore).mockReturnValue({ ...mockStore, cart: mockCart });

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    expect(screen.getByText("iPhone 12")).toBeInTheDocument();
    expect(screen.getByText("128GB | Black")).toBeInTheDocument();
    expect(screen.getAllByText("799 EUR")[0]).toBeInTheDocument();
  });

  it("calls removeFromCart when delete button is clicked", () => {
    const mockRemoveFromCart = vi.fn();
    const mockCart = [
      {
        id: "1",
        name: "iPhone 12",
        brand: "Apple",
        imageUrl: "/images/iphone12.jpg",
        selectedStorage: "128GB",
        selectedColor: "Black",
        basePrice: 799,
      },
    ];
    vi.mocked(useStore).mockReturnValue({
      ...mockStore,
      cart: mockCart,
      removeFromCart: mockRemoveFromCart,
    });

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Eliminar"));
    expect(mockRemoveFromCart).toHaveBeenCalledWith("1");
  });

  it("displays total price correctly", () => {
    const mockCart = [
      {
        id: "1",
        name: "iPhone 12",
        brand: "Apple",
        imageUrl: "/images/iphone12.jpg",
        selectedStorage: "128GB",
        selectedColor: "Black",
        basePrice: 799,
      },
      {
        id: "2",
        name: "Samsung Galaxy S21",
        brand: "Samsung",
        imageUrl: "/images/galaxys21.jpg",
        selectedStorage: "256GB",
        selectedColor: "White",
        basePrice: 999,
      },
    ];
    vi.mocked(useStore).mockReturnValue({
      ...mockStore,
      cart: mockCart,
      removeFromCart: vi.fn(),
    });

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    expect(screen.getAllByText("1798 EUR")[0]).toBeInTheDocument();
  });
});
