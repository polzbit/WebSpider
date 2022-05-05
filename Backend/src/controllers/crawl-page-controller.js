export default (fastify) => async (request, reply) => {
  const { options } = request.body;
  const data = await fastify.crawler.crawlPage({ options });
  return reply.send(JSON.stringify(data));
};
