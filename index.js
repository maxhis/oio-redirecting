const app = require('express')();
const PORT = process.env.PORT || 4000;
const { urls } = require('./urls');

app.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    statusCode: 200,
  })
});

app.get('*', (req, res) => {
  const path = req.path.split('/')[1];
  if (urls.hasOwnProperty(path)) {
    res.redirect(301, urls[path]);
  } else {
    res.redirect(301, 'https://oio.dev')
  }
});

app.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`));