import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BaseModel from "./BaseModel";

describe("<BaseModel />", () => {
  test("it should mount", () => {
    render(
      <BaseModel open={true}>
        <div>test</div>
      </BaseModel>
    );
    const model = screen.getByTestId("model");
    expect(model).toBeInTheDocument();
  });
});
