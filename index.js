const app = require('express')();
const PORT = process.env.PORT || 4000;
const { urls } = require('./urls');
const { counter, stat } = require('./counter');

app.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    statusCode: 200,
  })
});

app.get('/stat', stat);

app.use(counter);
app.get('*', (req, res) => {
  const path = req.path.split('/')[1];
  res.redirect(301, urls[path]);
});

app.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`));