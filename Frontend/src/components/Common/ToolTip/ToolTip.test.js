import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ToolTip from "./ToolTip";

describe("<ToolTip />", () => {
  test("it should mount", () => {
    render(
      <ToolTip tooltip="test">
        <div>test</div>
      </ToolTip>
    );
    const toolTip = screen.getByTestId("toolTip");
    const toolTipText = screen.queryByTestId("toolTipText");
    expect(toolTip).toBeInTheDocument();
    expect(toolTipText).not.toBeInTheDocument();
  });

  test("it should show/hide tooltip", () => {
    render(
      <ToolTip tooltip="test">
        <div>test</div>
      </ToolTip>
    );
    const toolTip = screen.getByTestId("toolTip");
    expect(toolTip).toBeInTheDocument();
    fireEvent.mouseEnter(toolTip);
    const toolTipText = screen.getByTestId("toolTipText");
    expect(toolTipText).toBeInTheDocument();
    fireEvent.mouseLeave(toolTip);
    expect(screen.queryByTestId("toolTipText")).not.toBeInTheDocument();
  });
});
