
module.exports = app => {
  app.get('/', (req, res, next) => {
    res.json({ page: 'Index', title: 'Welcome to SimpleCMS API' });
  });
};
