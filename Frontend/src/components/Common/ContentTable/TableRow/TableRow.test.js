import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TableRow from "./TableRow";
import { MOCK_PAGE } from "../mock";

describe("<TableRow />", () => {
  test("it should mount", () => {
    render(
      <TableRow page_index={1} page={MOCK_PAGE} toggleLinks={() => true} />
    );
    const tableRow = screen.getByTestId("tableRow");
    expect(tableRow).toBeInTheDocument();
  });

  test("it should show page links", () => {
    render(
      <TableRow
        page_index={1}
        page={{ ...MOCK_PAGE, open: true }}
        toggleLinks={() => true}
      />
    );

    const openLinksBtn = screen.getByTestId("openLinksBtn");

    expect(openLinksBtn).toBeInTheDocument();
    fireEvent.click(openLinksBtn);
  });
});
