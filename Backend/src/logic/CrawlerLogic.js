import fetch from "node-fetch";
import cheerio from "cheerio";

export default (fastify) => {
  class CrawlerLogic {
    calculateDepth(url_string) {
      const url = new URL(url_string);
      const dom_path = url.pathname;
      // remove last backslash if exists
      if (dom_path.charAt(dom_path.length - 1) === "/") {
        return dom_path.slice(0, -1).split("/").length - 1;
      }
      return dom_path.split("/").length - 1;
    }

    isValidLink(url) {
      return !!url.match(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/
      );
    }

    getHrefType({ url_string, href }) {
      const url = new URL(url_string);
      const newHref = href.split("?")[0];
      if (
        newHref.charAt(0) == "/" ||
        newHref.includes(url.hostname.replace("www.", ""))
      ) {
        return {
          url: newHref.charAt(0) == "/" ? url.origin + newHref : newHref,
          inner: true,
          origin: url.origin,
        };
      }
      const newUrl = new URL(newHref);
      return {
        url: newHref,
        inner: false,
        origin: newUrl.origin,
      };
    }

    pageParser({ url, body }) {
      const $ = cheerio.load(body);
      const linkElements = $("a");
      const depth = this.calculateDepth(url);
      const url_obj = new URL(url);
      const links = linkElements
        .map((index, element) => {
          const href = $(element).attr("href");
          if (href && href.length > 1 && href.charAt(0) !== "#") {
            fastify.log.info(href);
            const href_type = this.getHrefType({ url_string: url, href });
            if (this.isValidLink(href_type.url)) {
              return {
                text: $(element).text(),
                url: href_type.url,
                origin: href_type.origin,
                depth: this.calculateDepth(href_type.url),
                inner: href_type.inner,
              };
            }
          }
          return null;
        })
        .get();
      return {
        title: $("title").text(),
        url,
        depth,
        links: links.filter((link) => link),
        origin: url_obj.origin,
      };
    }

    async crawlPage({ options }) {
      const { maxDepth, maxPages, pages } = options;
      const url = pages[pages.length - 1];
      const response = await fetch(url);
      const body = await response.text();
      const page = this.pageParser({ url, body });
      const nextPage = page.links.find(
        (link) =>
          !pages.includes(link.url) && link.inner && link.depth <= maxDepth
      );
      const fin = pages.length >= maxPages || !nextPage;
      const newPages = fin ? pages : [...pages, nextPage.url];
      return {
        fin,
        options: {
          maxDepth,
          maxPages,
          pages: newPages,
        },
        page,
      };
    }
  }
  return (...params) => new CrawlerLogic(...params);
};
