const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
const port = 80;

const SPLITBEEURL = 'https://notion-api.splitbee.io/v1/';

// var corsOptions = {
//     origin: ["https://mobifi.io", "https://mobifi.info", "http://amazonaws.com"],
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

const corsArr = {
    origin: ["https://mobifi.io", "https://mobifi.info", "http://mobifi.info.s3-website.eu-west-1.amazonaws.com"]
}

app.use(express.json());
app.use(express.urlencoded());
// app.use(cors(corsOptions))

app.all('*', function (req, res, next) {
    let origin = req.headers.origin;
    if (corsArr.origin.indexOf(origin) >= 0) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH');
        return res.status(200).json({});
    }
    res.header("Access-Control-Allow-Headers", "*, Accept, Content-Type, Content-Length, Accept-Encoding, CUSTOM-ALLOWED-HEADER");
    next();
});

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