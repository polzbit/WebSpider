import ToolTip from "../ToolTip";

const MainButton = ({ children, tooltip, handleClick, disabled = false }) => {
  return (
    <div className="mainButton" data-testid="mainButton">
      <ToolTip text={tooltip}>
        <button type="button" onClick={handleClick} disabled={disabled}>
          {children}
        </button>
      </ToolTip>
    </div>
  );
};

export default MainButton;
