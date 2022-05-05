import { crawlPageController } from "../controllers/index.js";
import { CRAWL_PAGE } from "./routes.js";
export default (fastify) => ({
  ...CRAWL_PAGE,
  handler: crawlPageController(fastify),
});
