import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SideMenu from "./SideMenu";

describe("<SideMenu />", () => {
  let mockValues = {
    url: "",
    maxDepth: "1",
    maxPages: "1",
  };
  const mockHandleChange = (event) => {
    mockValues = { ...mockValues, [event.target.name]: event.target.value };
  };
  test("it should mount", () => {
    render(
      <SideMenu
        values={mockValues}
        submitStatus="test"
        submitActive={true}
        handleInputChange={mockHandleChange}
      />
    );
    const sideMenu = screen.getByTestId("sideMenu");
    expect(sideMenu).toBeInTheDocument();
  });
});
