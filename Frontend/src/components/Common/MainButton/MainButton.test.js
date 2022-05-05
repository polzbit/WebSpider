import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MainButton from "./MainButton";

describe("<MainButton />", () => {
  const mockClick = jest.fn();
  test("it should mount", () => {
    render(
      <MainButton tooltip="test" handleClick={mockClick}>
        test
      </MainButton>
    );
    const mainButton = screen.getByTestId("mainButton");
    expect(mainButton).toBeInTheDocument();
  });
});
