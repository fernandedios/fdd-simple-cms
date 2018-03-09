
module.exports = app => {
  app.get('/', (req, res, next) => {
    res.send({ page: 'Index', title: 'Welcome to SimpleCMS API' });
  });
};
