import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import PhoneRelated from "../PhoneRelated";
import { Phone } from "../../types/Phone";

describe("PhoneRelated", () => {
  const mockPhones: Phone[] = [
    {
      id: "1",
      brand: "Apple",
      name: "iPhone 13",
      basePrice: 999,
      imageUrl: "test-image1.jpg",
    },
    {
      id: "2",
      brand: "Samsung",
      name: "Galaxy S21",
      basePrice: 799,
      imageUrl: "test-image2.jpg",
    },
    {
      id: "3",
      brand: "Google",
      name: "Pixel 6",
      basePrice: 599,
      imageUrl: "test-image3.jpg",
    },
    {
      id: "4",
      brand: "OnePlus",
      name: "OnePlus 9",
      basePrice: 729,
      imageUrl: "test-image4.jpg",
    },
    {
      id: "5",
      brand: "Sony",
      name: "Xperia 5",
      basePrice: 899,
      imageUrl: "test-image5.jpg",
    },
    {
      id: "6",
      brand: "Nokia",
      name: "Nokia 8.3",
      basePrice: 499,
      imageUrl: "test-image6.jpg",
    },
  ];

  it("renders the correct number of phone items", () => {
    render(
      <BrowserRouter>
        <PhoneRelated phones={mockPhones} />
      </BrowserRouter>
    );

    const phoneItems = screen.getAllByRole("link");
    expect(phoneItems).toHaveLength(5);
  });

  it("renders phone information correctly", () => {
    render(
      <BrowserRouter>
        <PhoneRelated phones={mockPhones} />
      </BrowserRouter>
    );

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("iPhone 13")).toBeInTheDocument();
    expect(screen.getByText("999 EUR")).toBeInTheDocument();
    expect(screen.getByAltText("Apple iPhone 13")).toBeInTheDocument();

    expect(screen.getByText("Samsung")).toBeInTheDocument();
    expect(screen.getByText("Galaxy S21")).toBeInTheDocument();
    expect(screen.getByText("799 EUR")).toBeInTheDocument();
    expect(screen.getByAltText("Samsung Galaxy S21")).toBeInTheDocument();
  });
});
