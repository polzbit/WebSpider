import React, { useState } from "react";
import TableSubRow from "../TableSubRow/";

const TableRow = ({ page_index, page }) => {
  const [status, setStatus] = useState("SHOW");
  const PAGE_URL = new URL(page.url);
  const FAV_ICON = `${PAGE_URL.origin}/favicon.ico`;
  const GLOBE_ICON =
    "https://upload.wikimedia.org/wikipedia/commons/c/c4/Globe_icon.svg";

  const toggleLinks = () => {
    setStatus(status === "SHOW" ? "HIDE" : "SHOW");
  };

  return (
    <div className="tableRow" data-testid="tableRow">
      <div className="row row_container ">
        <ul className="page_container">
          <li className="p-col">
            <img
              src={FAV_ICON}
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
            <button onClick={toggleLinks} data-testid="openLinksBtn">
              {status + " LINKS"}
            </button>
          </li>
        </ul>
      </div>
      <div className="row links-container">
        {status === "HIDE" ? (
          <TableSubRow links={page.links} globeIcon={GLOBE_ICON} />
        ) : null}
      </div>
    </div>
  );
};

export default TableRow;
