import * as Express from 'express';

const server:Express.Express = Express();

server.get("/",(req:Express.Request, res:Express.Response) => {
  res.send('ok');
})

server.listen(8080);
