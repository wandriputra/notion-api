const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
const port = 5000;

const SPLITBEEURL = 'https://notion-api.splitbee.io/v1/';

var allowlist = ['https://mobifi.io', 'https://mobifi.info', 'http://localhost']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(express.json());
app.use(express.urlencoded());
app.use(cors(corsOptionsDelegate));

app.get('/:type/:id', async (req, res) => {
    const { params } = req;
    const table = await axios.get(SPLITBEEURL + '/' + params.type + '/' + params.id);
    return res.json(table.data);
})

app.get('*', (req, res) => {
    return res.status(404).json({ msg: 'Error 404' });
})

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})