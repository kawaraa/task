module.exports = (router) => {
  router.get("/", (request, response) => {
    response.send("API root path");
  });
  return router;
};
