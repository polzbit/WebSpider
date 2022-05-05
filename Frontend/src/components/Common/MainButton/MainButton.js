import ToolTip from "../ToolTip";

const MainButton = ({ children, tooltip, handleClick }) => {
  return (
    <div className="mainButton">
      <ToolTip text={tooltip}>
        <button type="button" onClick={handleClick}>
          {children}
        </button>
      </ToolTip>
    </div>
  );
};

export default MainButton;
