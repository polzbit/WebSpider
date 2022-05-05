import { useState } from "react";
import { isValidUrl } from "../../../util/validator";
import ContentTable from "../../Common/ContentTable";
import SideMenu from "../../Common/SideMenu";
import { crawlPage } from "../../../util/http";
import { sleep } from "../../../util/time";

const Crawler = () => {
  const [state, setState] = useState({
    ui: {
      submit: "SUBMIT",
      active: false,
    },
    values: {
      url: "",
      maxDepth: "1",
      maxPages: "1",
    },
    pages: [],
  });

  const handleInputChange = (event) => {
    const url =
      event.target.name === "url" ? event.target.value : state.values.url;
    const active =
      isValidUrl(url) &&
      !isNaN(state.values.maxDepth) &&
      !isNaN(state.values.maxPages);
    setState({
      ...state,
      ui: {
        ...state.ui,
        active,
      },
      values: { ...state.values, [event.target.name]: event.target.value },
    });
  };

  const handleSubmit = async (e) => {
    const { url, maxDepth, maxPages } = state.values;
    const options = {
      maxDepth: maxDepth.value,
      maxPages: maxPages.value,
      pages: [url.value],
    };
    await startCrawl({ options });
  };

  const startCrawl = async ({ options }) => {
    const response = await crawlPage({ options });
    if (response.status !== 200) {
      console.log(`[!] Crawl ended with status: ${response.status}`);
      return;
    }
    const result = await response.json();
    console.log(result);
    await renderPageRow(result.page);

    if (!result.fin) {
      await sleep(1000);
      await startCrawl({ options: result.options });
    }
  };
  const renderPageRow = (page) =>
    new Promise((resolve) => {
      setState((s) => ({ ...s, pages: [...s.pages, page] }));
      resolve();
    });

  return (
    <div className="crawlerPage">
      <div id="form-section" className="column sm">
        <SideMenu
          values={state.values}
          handleSubmit={handleSubmit}
          submitStatus={state.ui.submit}
          submitActive={state.ui.active}
          handleInputChange={handleInputChange}
        />
      </div>
      <div id="view-section" className="column bg">
        <div className="row title">
          <h2>RESULTS</h2>
        </div>
        <ContentTable pages={state.pages} isLink={isValidUrl}></ContentTable>
      </div>
    </div>
  );
};
export default Crawler;
