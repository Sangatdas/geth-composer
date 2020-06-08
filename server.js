const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

const ethRouter = require('./routes/eth.routes');
const personalRouter = require('./routes/personal.routes');
const minerRouter = require('./routes/miner.routes');

app.use(bodyParser.json());
// app.use(cors());

app.use('/eth/', ethRouter);
app.use('/personal/', personalRouter);
app.use('/miner/', minerRouter);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log("Server started on port ", PORT);
});