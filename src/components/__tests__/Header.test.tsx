import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Header from "../Header";
import { useStore } from "../../hooks/useStore";

vi.mock("../../hooks/useStore");

describe("Header", () => {
  it("renders the cart link when not on the cart page", () => {
    vi.mocked(useStore).mockReturnValue({
      phones: [],
      cart: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      getPhoneById: vi.fn(),
    });

    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText("MBST")).toBeInTheDocument();
    expect(container.querySelector('a[href="/cart"]')).toBeInTheDocument();
  });

  it("does not render the cart link when on the cart page", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("MBST")).toBeInTheDocument();
    expect(container.querySelector('a[href="/cart"]')).not.toBeInTheDocument();
  });
});
