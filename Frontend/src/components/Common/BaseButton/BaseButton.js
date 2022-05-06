import ToolTip from "../ToolTip";

const BaseButton = ({ children, tooltip, handleClick, disabled = false }) => {
  return (
    <div className="baseButton" data-testid="baseButton">
      <ToolTip text={tooltip}>
        <button type="button" onClick={handleClick} disabled={disabled}>
          {children}
        </button>
      </ToolTip>
    </div>
  );
};

export default BaseButton;
