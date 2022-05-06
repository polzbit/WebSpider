import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LinkRow from "./LinkRow";

describe("<LinkRow />", () => {
  const mockLink = {
    text: "test link",
    url: "https://www.test.com/link",
    origin: "https://www.test.com",
    depth: 1,
    inner: true,
  };
  test("it should mount", () => {
    render(<LinkRow link={mockLink} />);
    const linkRow = screen.getByTestId("linkRow");
    expect(linkRow).toBeInTheDocument();
  });
});
