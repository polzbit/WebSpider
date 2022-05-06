import { GLOBE_ICON } from "../mock";

const TableRow = ({ page_index, page, favIcon, toggleLinks }) => {
  return (
    <div className="tableRow" data-testid="tableRow">
      <div className="row row_container ">
        <ul className="page_container">
          <li className="p-col">
            <img
              src={favIcon}
              onError={(e) => {
                e.target.src = GLOBE_ICON;
              }}
              alt=""
              height="32"
              width="32"
            />

            <div className="row page-index">
              <p>{`PAGE ${page_index + 1}`}</p>
            </div>
          </li>
          <li className="p-col p-data">
            <ul className="page-data">
              <li>
                <span>TITLE </span>
                {page.title}
              </li>
              <li>
                <span>DEPTH </span>
                {page.depth}
              </li>
              <li>
                <span>URL </span>
                <a href={page.url} rel="noreferrer" target="_blank">
                  {page.url}
                </a>
              </li>
            </ul>
          </li>
          <li className="p-col show-links">
            <button
              onClick={() => toggleLinks(page.url)}
              data-testid="openLinksBtn"
            >
              {"SHOW MORE"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TableRow;
