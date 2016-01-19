'use strict';

process.on('unhandledRejection', (err, p) => {
  console.log(err);
});

/*
import Client from './lib/client';

const client = new Client();
client.get('/asdf.html')
  .then(console.log);
*/

const p = new Promise((resolve, reject) => {
  reject(new Error('hello'));
});

p.then(console.log);
