import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("renders search input correctly", () => {
    const mockSetSearchTerm = vi.fn();
    render(<SearchBar searchTerm="" setSearchTerm={mockSetSearchTerm} />);

    expect(
      screen.getByPlaceholderText("Search for a smartphone...")
    ).toBeInTheDocument();
  });

  it("calls setSearchTerm on input change", () => {
    const mockSetSearchTerm = vi.fn();
    render(<SearchBar searchTerm="" setSearchTerm={mockSetSearchTerm} />);

    const input = screen.getByPlaceholderText("Search for a smartphone...");
    fireEvent.change(input, { target: { value: "iPhone" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("iPhone");
  });

  it("displays the correct search term", () => {
    const mockSetSearchTerm = vi.fn();
    render(
      <SearchBar searchTerm="Samsung" setSearchTerm={mockSetSearchTerm} />
    );

    const input = screen.getByPlaceholderText("Search for a smartphone...");
    expect(input).toHaveValue("Samsung");
  });
});
