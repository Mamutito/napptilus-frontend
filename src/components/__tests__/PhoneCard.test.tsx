import React from "react";
import { render, screen } from "@testing-library/react";
import { PhoneCard } from "../PhoneCard";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("PhoneCard", () => {
  const mockPhone = {
    id: "1",
    brand: "Apple",
    name: "iPhone 13",
    basePrice: 999,
    imageUrl: "test-image.jpg",
  };

  it("renders phone information correctly", () => {
    render(
      <BrowserRouter>
        <PhoneCard phone={mockPhone} />
      </BrowserRouter>
    );

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("iPhone 13")).toBeInTheDocument();
    expect(screen.getByText("999 EUR")).toBeInTheDocument();
    expect(screen.getByAltText("Apple iPhone 13")).toBeInTheDocument();
  });
});
