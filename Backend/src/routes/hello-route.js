import { helloController } from "../controllers/index.js";
import { HELLO } from "./routes.js";
export default (fastify) => ({
  ...HELLO,
  handler: helloController(fastify),
});
