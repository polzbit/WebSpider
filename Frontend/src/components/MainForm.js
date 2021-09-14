import React, {useState} from 'react';

/* Main form */
const MainForm = (props)=> {
    const [status, setStatus] = useState("Submit")
    const [state, setState] = useState(false)

    /* submit handler */
	const handleSubmit = async(e) => {
        e.preventDefault();
        getPage(e);
    }
    
    /* crawl page by page */
    const getPage = async(e) => {
        // clear ui pages table
        props.resultCallback({status:'clear', data:[]});
        // lock submit
        setState(false);
        const {url, maxDepth, maxPages} = e.target.elements;
        // set data
        let opt = {
            url: url.value,
            maxDepth: maxDepth.value,
            maxPages: maxPages.value,
            pages: [],
            toLook: []
        }
        let pageIndex = 1;
        // update ui button text
        setStatus("Loading page "+ pageIndex + "...");
        // post data to api 
        do {
            let response = await fetch("http://localhost:5000/api/crawl_page", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(opt)
            });
            // wait for api response
            let result = await response.json();
            // set new data
            opt.url = result.data.url;
            opt.toLook = [...result.data.toLook];
            opt.pages = [...result.data.pages];
            // check for stop condition
            if(!opt.toLook.length) {
                break;
            }
            // send results to callback
            props.pageCallback(result);
            pageIndex++;
            // update ui button text
            setStatus("Loading page "+ pageIndex +"...");
        } while(opt.toLook.length);
        // unlock submit
        setState(true);
        setStatus("Submit");
    }

    /* crawl all pages */
    /*
    const getAll = async(e) => {
        // clear ui pages table
        props.resultCallback({status:'clear', data:[]});
        // lock submit
        setState(false);
        const {url, maxDepth, maxPages} = e.target.elements;
        let values = {
            url: url.value,
            maxDepth: maxDepth.value,
            maxPages: maxPages.value
        }
        setStatus("Loading pages...");
        // post data to api 
        let response = await fetch("http://localhost:5000/api/crawl_all", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(values)
        });
        // wait for api response
        let result = await response.json();
        // send results to callback
        props.resultCallback(result);
        // unlock submit
        setState(true);
        setStatus("Submit");
    }
    */
    /* validate http/s link */
    const getValidation = (url) => {
	    setState(props.isLink(url));   
  	}

    return (
        <div id="main-form">
            <form onSubmit={handleSubmit}>
                <div className="row mt-1">
                    <label htmlFor="url">URL</label>
                    <input type="text" placeholder="ex: https://www.google.com" id="url" onChange={(e) => getValidation(e.target.value)} required/>
                </div>
                <div className="row mt-1">
                    <label htmlFor="maxDepth">Max Depth</label>
                    <input type="number" min="0" defaultValue="0" id="maxDepth"required/>
                </div>
                <div className="row mt-1">
                    <label htmlFor="maxPages">Max Pages</label>
                    <input type="number" min="1" defaultValue="1" id="maxPages"required/>
                </div>
                <div className="row mt-3">
                    <button type="submit" id="submit_btn" disabled={!state}>{status}</button>
                </div>
            </form>
        </div>
    )
	
}

export default MainForm;