const SERVER_PORT = 5000;
const SERVER_ORIGIN = `http://localhost:${SERVER_PORT}`;
const SERVER_ROUTES = {
  HELLO: `${SERVER_ORIGIN}/api/v1/hello`,
  CRAWL_PAGE: `${SERVER_ORIGIN}/api/v1/crawl-page`,
};

export const crawlPage = async ({ options }) => {
  return await fetch(SERVER_ROUTES.CRAWL_PAGE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ options }),
  });
};
