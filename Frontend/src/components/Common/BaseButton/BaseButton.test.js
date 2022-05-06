import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BaseButton from "./BaseButton";

describe("<BaseButton />", () => {
  const mockClick = jest.fn();
  test("it should mount", () => {
    render(
      <BaseButton tooltip="test" handleClick={mockClick}>
        test
      </BaseButton>
    );
    const baseButton = screen.getByTestId("baseButton");
    expect(baseButton).toBeInTheDocument();
  });
});
