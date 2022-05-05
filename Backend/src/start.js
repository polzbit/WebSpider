import fastifyInit from "fastify";
import config from "./config.json" assert { type: "json" };
import CrawlerLogic from "./logic/CrawlerLogic.js";
import initRoutes from "./routes/index.js";
import proxy from "fastify-http-proxy";
import cors from "fastify-cors";

const initializeRoutes = (fastify) => {
  const routes = initRoutes(fastify);

  Object.values(routes).forEach((route) => {
    fastify.route(route);
  });
};

const service = ({ config }) => {
  const fastify = fastifyInit({ logger: config.logger });
  fastify.register(cors).after(() => {
    const crawler = CrawlerLogic(fastify)();
    fastify.decorate("crawler", crawler);
  });
  initializeRoutes(fastify);
  const start = async () => {
    try {
      fastify.register(proxy, {
        upstream: "http://0.0.0.0:5000",
        prefix: "/api/v1",
        rewritePrefix: "/v1",
        http2: false,
      });
      await fastify.listen({ port: config.port, host: config.host });
    } catch (err) {
      fastify.log.error(err);
      throw err;
    }
  };

  return {
    start,
    instance: fastify,
  };
};

service({
  config,
}).start();
