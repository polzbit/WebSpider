export default (fastify) => async (request, reply) => {
  return reply.send(JSON.stringify({ msg: "hello" }));
};
