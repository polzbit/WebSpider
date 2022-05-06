import PageModel from "../PageModel";
import TableRow from "./TableRow";

const ContentTable = ({ pages, toggleLinks, handleClose }) => {
  return (
    <div className="contentTable" data-testid="contentTable">
      {pages.map((page, i) => {
        const PAGE_URL = new URL(page.url);
        const FAV_ICON = `${PAGE_URL.origin}/favicon.ico`;
        return (
          <div className="contentRow" key={i}>
            <TableRow
              page_index={i}
              page={page}
              favIcon={FAV_ICON}
              toggleLinks={toggleLinks}
            />
            <PageModel
              page={page}
              favIcon={FAV_ICON}
              open={page.open}
              handleClose={() => handleClose(page.url)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ContentTable;
