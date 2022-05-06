import { useRef, useEffect } from "react";
const BaseModel = ({ children, open, handleClose }) => {
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleClose]);
  if (open) {
    return (
      <div className="modelBg">
        <div ref={ref} className="model" data-testid="model">
          {children}
        </div>
      </div>
    );
  }
  return null;
};

export default BaseModel;
