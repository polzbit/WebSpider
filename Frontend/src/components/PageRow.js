import React, {useState} from 'react';
import LinksRow from './LinksRow';

/* Page Links Table */
const PageRow = (props)=> {
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState("SHOW");

    /* toggle show/hide page links */
    const toggleLinks = () => {
        setShow(!show);
        if(show) setStatus("SHOW");
        else setStatus("HIDE");
    };
    /* in case no favicon found show default icon */
    const getDefultIcon = (e) => {
        e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Globe_icon.svg'
    }
	return (
		<li key={"page_" + props.page_index} className="page-row">
            <div className="row row_container ">
                <ul className="page_container">
                    <li className="p-col" key="page_index">
                        <img src={props.page.links.length ? props.page.links[0].origin + "/favicon.ico":'https://upload.wikimedia.org/wikipedia/commons/c/c4/Globe_icon.svg'} onError={getDefultIcon} alt="" height="32" width="32"/>
                        <div className="row page-index">
                            <p>{"PAGE " + (props.page_index+1)}</p>
                        </div>
                    </li>
                    <li className="p-col p-data" key="page_data">
                        <ul className="page-data">
                            <li key={"page_" + props.page_index + "_title"}><span>TITLE </span>{props.page.title}</li>
                            <li key={"page_" + props.page_index + "_depth"}><span>DEPTH </span>{props.page.depth}</li>
                            <li key={"page_" + props.page_index + "_url"}><span>URL </span><a href={props.page.url} rel="noreferrer" target="_blank">{props.page.url}</a></li>
                        </ul>
                    </li>
                    <li className="p-col show-links" key="page_links_btn">
                        <button onClick={toggleLinks}>{status + " LINKS"}</button>
                    </li>
                </ul>
            </div>
            <div className="row links-container">
                {show ? <LinksRow page_index={props.page_index} links={props.page.links} def_icon={getDefultIcon}></LinksRow> : null}
            </div>
        </li>
	)
}

export default PageRow;