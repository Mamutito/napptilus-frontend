import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PhoneDetail from "../PhoneDetail";
import { PhoneDetailEntity } from "../../types/Phone";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";

vi.mock("../../hooks/useStore");
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));
const mockAddToCart = vi.fn();
const mockNavigate = vi.fn();
vi.mocked(useStore).mockReturnValue({
  addToCart: mockAddToCart,
  cart: [],
  removeFromCart: vi.fn(),
  phones: [],
  getPhoneById: vi.fn(),
});
vi.mocked(useNavigate).mockReturnValue(mockNavigate);

const mockPhone: PhoneDetailEntity = {
  id: "1",
  name: "Test Phone",
  brand: "Test Brand",
  basePrice: 1000,
  colorOptions: [
    { name: "Black", hexCode: "#000000", imageUrl: "/black.png" },
    { name: "White", hexCode: "#FFFFFF", imageUrl: "/white.png" },
  ],
  storageOptions: [
    { capacity: "64GB", price: 1000 },
    { capacity: "128GB", price: 1200 },
  ],
  specs: {
    screen: "6.1 inch",
    resolution: "1080x2400",
    processor: "Test Processor",
    mainCamera: "12MP",
    selfieCamera: "8MP",
    battery: "3000mAh",
    os: "Test OS",
    screenRefreshRate: "60Hz",
  },
  description: "Test Description",
  rating: 4,
  similarProducts: [],
};

describe("PhoneDetail", () => {
  it("renders phone details correctly", () => {
    render(<PhoneDetail phone={mockPhone} />);

    expect(screen.getByText("Test Phone")).toBeInTheDocument();
    expect(screen.getByText("1000 EUR")).toBeInTheDocument();
    expect(screen.getByAltText("Test Phone")).toBeInTheDocument();
  });

  it("updates selected storage and color", () => {
    render(<PhoneDetail phone={mockPhone} />);

    const storageButton = screen.getByText("128GB");
    fireEvent.click(storageButton);
    expect(storageButton).toHaveClass("border-black");

    const colorButton = screen.getAllByTestId("color-button")[0];
    fireEvent.click(colorButton);
    expect(colorButton).toHaveClass("ring-2 ring-black");
  });

  it("enables add to cart button when storage and color are selected", () => {
    render(<PhoneDetail phone={mockPhone} />);

    const storageButton = screen.getByText("128GB");
    fireEvent.click(storageButton);

    const colorButton = screen.getAllByTestId("color-button")[0];
    fireEvent.click(colorButton);

    const addButton = screen.getByText("AÑADIR");
    expect(addButton).not.toHaveClass("cursor-not-allowed");
    expect(addButton).toHaveClass("bg-black text-white");
  });

  it("adds item to cart and navigates to cart page", () => {
    render(<PhoneDetail phone={mockPhone} />);

    const storageButton = screen.getByText("128GB");
    fireEvent.click(storageButton);

    const colorButton = screen.getAllByTestId("color-button")[0];
    fireEvent.click(colorButton);

    const addButton = screen.getByText("AÑADIR");
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });
});
