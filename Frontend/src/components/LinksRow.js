import React from 'react';

/* Page Links row */
const LinksRow = (props)=> {
	const renderLink = (link, i) => {
        return(
            <li key={"page_" + props.page_index + "_link_" + i} className="link-li">
                <ul className="link_ul">
                    <li className="link-col favicon">
                        <img src={link.origin + "/favicon.ico"} onError={props.def_icon} alt="" height="32" width="32"/>
                    </li>
                    <li className="link-col">
                        <ul className="link-row" >
                            <li key={"page_" + props.page_index + "_link_" + i + "_text"} className="link-txt"><span>NAME </span>{link.text}</li>
                            <li key={"page_" + props.page_index + "_link_" + i + "_url"} className="link-href"><span>LINK </span><a href={link.url} rel="noreferrer" target="_blank">{link.url}</a></li>
                            <li key={"page_" + props.page_index + "_link_" + i + "_depth"} ><span>DEPTH </span>{link.depth}</li>
                        </ul>
                    </li>
                </ul>
            </li>
        )
    };
	return (
		<ul className="page-links">
            {props.links.map(renderLink)}
        </ul>
	)
}

export default LinksRow;