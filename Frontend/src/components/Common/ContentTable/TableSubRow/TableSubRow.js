import React from "react";

/* Page Links row */
const TableSubRow = ({ links, globeIcon }) => {
  return (
    <ul className="tableSubRow">
      {links.map((link, i) => (
        <li key={i} className="link-li">
          <ul className="link_ul">
            <li className="link-col favicon">
              <img
                src={`${link.origin}/favicon.ico`}
                onError={(e) => {
                  e.target.src = globeIcon;
                }}
                alt=""
                height="32"
                width="32"
              />
            </li>
            <li className="link-col">
              <ul className="link-row">
                <li className="link-txt">
                  <span>NAME </span>
                  {link.text}
                </li>
                <li className="link-href">
                  <span>LINK </span>
                  <a href={link.url} rel="noreferrer" target="_blank">
                    {link.url}
                  </a>
                </li>
                <li>
                  <span>DEPTH </span>
                  {link.depth}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default TableSubRow;
