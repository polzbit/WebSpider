/* import modules */
const express = require('express');
const cors = require('cors');
const crawler = require('./crawler');
/* create app */
const app = express();
app.use(cors());
app.use(express.json());

/* api crawl all pages */
app.post("/api/crawl_all", async(req, res) => {
    // get user inputs
    const crawl_opt = {
        url: new URL(req.body.url),
        maxDepth: req.body.maxDepth,
        maxPages: req.body.maxPages,
    };
    // get all url pages
    res = await crawler.crawlAll(crawl_opt);
    let crawl_results = {
        hostname: crawl_opt.url.hostname,
        pages: res,
        status: 'success'
    }
    if (res === 'failed'){
        crawl_results.status = 'failed';
    }
    // send crawl results
    res.end(JSON.stringify(crawl_results));
});

/* api crawl page by page */
app.post("/api/crawl_page", async(req, res) => {
    // get user inputs
    let crawl_opt = {
        url: new URL(req.body.url),
        maxDepth: req.body.maxDepth,
        maxPages: req.body.maxPages,
        pages: req.body.pages,
        toLook: req.body.toLook
    };
    // check for stop condition
    if(crawl_opt.pages.length == crawl_opt.maxPages) {
        // case max pages found
        crawl_opt.toLook = [];
        const crawl_results = {
            hostname: crawl_opt.url.hostname,
            data: crawl_opt,
            status: 'fin'
        }
        // send crawl results
        res.end(JSON.stringify(crawl_results));
    } else {
        const result = await crawler.crawlPage(crawl_opt);
        let crawl_results = {
            hostname: crawl_opt.url.hostname,
            data: result,
            status: 'success'
        }
        if (res === 'failed'){
            crawl_results.status = 'failed';
        }
        // send crawl results
        res.end(JSON.stringify(crawl_results));
    }
});

/* start listener on port 5000 */
app.listen(5000, ()=> console.log("[*] Server is listening on port: 5000"));