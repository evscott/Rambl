import * as express from 'express';
const app = express.Router();

export { app as routes };

app.get('/users',(req, res) => res.send('Hello World'));
app.get('/users', (req, res) => res.send([]));
app.post('/users', (req, res) => res.send({body: req.body}));
