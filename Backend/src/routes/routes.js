export const HELLO = {
  method: "GET",
  url: "/api/v1/hello",
};

export const CRAWL_PAGE = {
  method: "POST",
  url: "/api/v1/crawl-page",
  schema: {
    body: {
      type: "object",
      required: ["options"],
      properties: {
        options: {
          type: "object",
        },
      },
    },
  },
};
