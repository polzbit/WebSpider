import helloRoute from "./hello-route.js";
import crawlPageRoute from "./crawl-page-route.js";

export default (fastify) => ({
  helloRoute: helloRoute(fastify),
  crawlPageRoute: crawlPageRoute(fastify),
});
