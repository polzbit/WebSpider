import React, {useState} from 'react';
import MainForm from './MainForm';
import ContentTable from './ContentTable';
/* Main view */
const CrawlerView = ()=> {
    const [pages, setPages] = useState([]);

    const resultCallback = (res) => {
        // check result status
        console.log(res);
        if(res.status === "success") {
            // case post success
            setPages(old_pages => [...old_pages, ...res.pages]);   
        } else if (res.status === "clear"){
            // case clear results
            setPages([]);
        }
    };

    const pageCallback = (res) => {
        // check result status
        console.log(res);
        if(res.status === "success") {
            // case post success
            setPages(old_pages => [...old_pages, res.data.pages[res.data.pages.length - 1]]);   
        }
    }

    const is_link = (url) => {
        /* check if url is valid link */
        return url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/) ? true : false;
    };
    return (
        <div id="crawlerView" className="row" >
            <div id="form-section" className="column sm">
                <MainForm resultCallback={resultCallback} pageCallback={pageCallback} isLink={is_link}></MainForm>
            </div>
            <div id="view-section" className="column bg">
                <div className="row title">
                    <h2>RESULTS</h2>
                </div>
                <ContentTable pages={pages} isLink={is_link}></ContentTable>
            </div>
        </div>
    )
	
}

export default CrawlerView;