import express from 'express';
import mysql from 'mysql';
import { faker } from '@faker-js/faker';

faker.locale = 'pt_BR';

const app = express();

const config = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const connection = mysql.createConnection(config);

interface Results {
  name: string;
}

app.get('/', (req, res) => {
  const name = faker.name.firstName();

  const sqlInsert = `INSERT INTO people(name) values('${name}')`;
  connection.query(sqlInsert, (err) => {
    if (err) throw err;
    const sqlSelect = 'SELECT name FROM people';
    connection.query(sqlSelect, (err_, results) => {
      if (err) throw err;
      if (results.length === 0) {
        res.send('<h1>Full Cycle</h1>');
      }
      const names = (results as Results[]).reduce(
        (acc, curr) => `${acc}<li>${curr.name}</li>`,
        ''
      );
      res.send(`<h1>Full Cycle</h1><ul>${names}</ul>`);
    });
  });
});

app.on('close', () => {
  connection.end();
});

export default app;
