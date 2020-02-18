const express = require('express');

const app = express();
const router = express.Router();
const getForcastForLondon = require('./stud/getForcastForLondon.json');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.get('/', (req, res) => {
    res.send(JSON.stringify(getForcastForLondon))
})

app.listen('3000', ()=>{ console.log(`I am listening on 3000`)});