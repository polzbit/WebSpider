/* import modules */
const axios = require('axios');
const cheerio = require('cheerio');

/* axios get page by page, getting page and updating UI.
stop condition when toLook list is empty */
const crawlPage = async(options) => {
    const { url, maxDepth, maxPages, pages, toLook } = options;
    let new_opt = {
        url: url,
        maxDepth: maxDepth,
        maxPages: maxPages,
        pages: pages,
        toLook: []
    };
    try {
        const res = await axios.get(url.href);
        if(res.status != 200) {
            return new_opt;
        }
        // on valid request get page body
        console.log('[ Crawler ] crawling page: ' + url.href);
        let newPages = [...pages];
        const page = get_page_data(options, res.data);
        newPages.push(page);
        const newToLook = [...toLook, ...page.domainLinks];
        if(!newToLook.length) {
            return new_opt;
        }
        // case more pages to look
        new_opt = {
            url: newToLook[0].url,
            maxDepth: maxDepth,
            maxPages: maxPages,
            pages: newPages,
            toLook: newToLook.slice(1, newToLook.length)
        };
    } catch(err) {
        console.log(err);
    } finally {
        return new_opt;
    }
}

/* axios get all pages, recursive function to crawl domain.
stop condition raise when num of pages found equal to maxPage 
or when no more pages found */
const crawlAll = async(options, prevPages=[], prevToLook=[]) => {
    const { url, maxDepth, maxPages } = options;
    let pages = [...prevPages];
    let toLook = [...prevToLook];
    try {
        const res = await axios.get(url.href);
        if(res.status != 200) {
            // case page not loaded
            console.log('[ ! ] loading error, page: "' + url.href + '".\nstarting to next page.');
            if (toLook.length > 0){
                const crawl_opt = {
                    url: new URL(toLook[0].url),
                    maxDepth: maxDepth,
                    maxPages: maxPages,
                };
                return getAll(crawl_opt, pages, toLook.slice(1, toLook.length))
            }
            else {
                return pages;
            }
        } else {
            console.log('[ Crawler ] crawling page: ' + url.href);
            // getting page data
            const page = get_page_data(options, res.data);
            pages.push(page);
            // stop condition
            if(pages.length == maxPages) {
                return pages;
            }
            // check for next page
            const newToLook = [...toLook, ...page.domainLinks];
            for(let i = 0; i < newToLook.length; i++) {
                // check for duplicates urls
                const exists = pages.some(p => {
                    return newToLook[i].url === p.url;
                });
                if(!exists) {
                    // case url not beeing crawled yet
                    const crawl_opt = {
                        url: new URL(newToLook[i].url),
                        maxDepth: maxDepth,
                        maxPages: maxPages,
                    };
                    return getAll(crawl_opt, pages, newToLook.slice(i + 1, newToLook.length));
                }
            }
            // next page not found
            return pages;
        }

    } catch(err) {
        console.log(err);
    } finally {
        return new_opt;
    }
}

/* link validator */
const is_link = (url) => {
    /* check if url is valid link */
    return url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/) ? true : false;
};

/* extract page data from body elements using cheerio module */
const get_page_data = (options, page_body) => {
    const $ = cheerio.load(page_body);     // load html body
    const linkElements = $('a');
    let links = [];
    let innerLinks = [];
    // calc current depth
    const page_depth = calc_depth(options.url);
    // get links from all 'a' tag elements
    linkElements.each((index, element) => {
        let href = $(element).attr('href');
        // check that href is valid and that it's not redirect to element tag
        if (href && href.length > 1 && href.charAt(0) != "#") {
            // check for inner domain paths
            let inner_path = false;
            if(href.charAt(0) == '/') {
                inner_path = true;
                href = options.url.origin + href;
            } else if(href.indexOf(options.url.origin) != -1){
                inner_path = true;
            }
            // check if link is http\s url
            if(is_link(href)) {
                const url = new URL(href);
                const link_depth = calc_depth(url);
                // add new link
                links.push({
                    text: $(element).text(),
                    url: url.href,
                    origin: url.origin,
                    depth: link_depth,
                });
                if(inner_path && link_depth <= options.maxDepth) {
                    // add new domain link
                    innerLinks.push({
                        text: $(element).text(),
                        url: url.href,
                        depth: link_depth,
                    });
                }
            }
        }
    });
    // return page data
    return {
        title: $('title').text(),
        url: options.url.href,
        depth: page_depth,
        links: links,
        domainLinks: innerLinks
    }
};

/* Calculate url domain depth */
const calc_depth = (url) => {
    let dom_path = url.pathname;
    // remove last backslash if exists
    if(dom_path.charAt(dom_path.length-1) === '/') dom_path = dom_path.slice(0, -1);
    return dom_path.split('/').length - 1;
}

/* export main crawl function */
module.exports = {crawlAll, crawlPage};