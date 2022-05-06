import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PageModel from "./PageModel";

describe("<PageModel />", () => {
  test("it should mount", () => {
    render(<PageModel open={true} />);
    const model = screen.getByTestId("model");
    expect(model).toBeInTheDocument();
  });
});
