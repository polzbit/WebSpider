import { useState } from "react";
import cx from "classnames";

const DIRECTIONS = {
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
};

const ToolTip = ({ children, text, direction = "top" }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className="toolTip"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={cx(
            "toolTipText",
            { top: direction === DIRECTIONS.top },
            { bottom: direction === DIRECTIONS.bottom },
            { right: direction === DIRECTIONS.right },
            { left: direction === DIRECTIONS.left }
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default ToolTip;
