import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.static(`${__dirname}/dist`));

app.listen(port);
