import * as http from 'http';
import App from './App';

const port = 3000;

http
  .createServer((req, res) => {
    res.end(); // end the response
  })
  .listen(port, () => {
    console.log(`server start at port ${port}`);
  });

module.exports = App;
