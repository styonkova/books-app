

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/books.json');
const middlewares = jsonServer.defaults();
const db = require('./books.json');
const fs = require('fs');
const PORT = 3000;

server.use(middlewares);

// todo add filter by author and title

server.use(jsonServer.rewriter(require('./routes.json')));
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});

