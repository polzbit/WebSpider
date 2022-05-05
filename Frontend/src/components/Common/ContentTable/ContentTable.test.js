import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ContentTable from "./ContentTable";
import { MOCK_PAGE } from "./mock";

describe("<ContentTable />", () => {
  const pages = [MOCK_PAGE, MOCK_PAGE];
  test("it should mount", () => {
    render(<ContentTable pages={pages} />);
    const contentTable = screen.getByTestId("contentTable");
    expect(contentTable).toBeInTheDocument();
  });
});
