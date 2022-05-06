import BaseModel from "../BaseModel";
import { GLOBE_ICON } from "../ContentTable/mock";
const PageModel = ({ page, favIcon, open, handleClose }) => {
  const innerLinks = page.links.filter((link) => link.inner);
  const outLinks = page.links.filter((link) => !link.inner);
  return (
    <BaseModel open={open} handleClose={handleClose}>
      <div className="modelRow">
        <img
          src={favIcon}
          onError={(e) => {
            e.target.src = GLOBE_ICON;
          }}
          alt=""
          height="32"
          width="32"
        />
        <div className="pageHeader">{page.title}</div>
      </div>
      <div className="modelRow">
        <div className="modelText">
          Found {innerLinks.length} links connected to the domain.
        </div>
      </div>
    </BaseModel>
  );
};

export default PageModel;
