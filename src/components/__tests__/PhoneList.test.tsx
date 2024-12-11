import React from "react";
import { render, screen } from "@testing-library/react";
import { PhoneList } from "../PhoneList";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { useStore } from "../../hooks/useStore";

vi.mock("../../hooks/useStore");

describe("PhoneList", () => {
  const mockPhones = [
    {
      id: "1",
      brand: "Apple",
      name: "iPhone 13",
      basePrice: 999,
      imageUrl: "test-image.jpg",
    },
    {
      id: "2",
      brand: "Samsung",
      name: "Galaxy S21",
      basePrice: 799,
      imageUrl: "test-image.jpg",
    },
  ];

  beforeEach(() => {
    vi.mocked(useStore).mockReturnValue({
      phones: mockPhones,
      cart: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      getPhoneById: vi.fn(),
    });
  });

  it("renders the correct number of results", () => {
    render(
      <BrowserRouter>
        <PhoneList searchTerm="iPhone" />
      </BrowserRouter>
    );

    expect(screen.getByText("1 RESULTS")).toBeInTheDocument();
  });

  it("renders phone cards based on search term", () => {
    render(
      <BrowserRouter>
        <PhoneList searchTerm="Samsung" />
      </BrowserRouter>
    );

    expect(screen.getByText("Samsung")).toBeInTheDocument();
    expect(screen.getByText("Galaxy S21")).toBeInTheDocument();
  });

  it("renders no results message when no phones match the search term", () => {
    render(
      <BrowserRouter>
        <PhoneList searchTerm="Nokia" />
      </BrowserRouter>
    );

    expect(screen.getByText("0 RESULTS")).toBeInTheDocument();
  });
});
