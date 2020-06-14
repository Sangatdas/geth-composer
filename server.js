const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

const ethRouter = require('./routes/eth.routes');
const personalRouter = require('./routes/personal.routes');
const apiRouter = require('./routes/api.routes');
const adminRouter = require('./routes/admin.route');

app.use(bodyParser.json());
app.use(cors());

app.use('/eth/', ethRouter);
app.use('/personal/', personalRouter);
app.use('/api/', apiRouter);
app.use('/admin', adminRouter)

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log("Server started on port ", PORT);
});