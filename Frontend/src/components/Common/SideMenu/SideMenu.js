import BaseButton from "../BaseButton";

const SideMenu = ({
  values,
  handleSubmit,
  submitStatus,
  submitActive,
  handleInputChange,
}) => {
  return (
    <div className="sideMenu" data-testid="sideMenu">
      <div className="formRow mt-1">
        <div className="lbl">
          <label htmlFor="url">URL</label>
        </div>
        <input
          type="text"
          placeholder="ex: https://www.google.com"
          id="url"
          name="url"
          value={values.url}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="formRow mt-1">
        <div className="lbl">
          <label htmlFor="maxDepth">Max Depth</label>
        </div>
        <input
          type="text"
          id="maxDepth"
          name="maxDepth"
          value={values.maxDepth}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="formRow mt-1">
        <div className="lbl">
          <label htmlFor="maxPages">Max Pages</label>
        </div>
        <input
          type="text"
          id="maxPages"
          name="maxPages"
          value={values.maxPages}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="formRow mt-3">
        <BaseButton
          tooltip="Crawl"
          handleClick={handleSubmit}
          disabled={!submitActive}
        >
          {submitStatus}
        </BaseButton>
      </div>
    </div>
  );
};

export default SideMenu;
