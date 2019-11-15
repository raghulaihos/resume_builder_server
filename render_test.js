const fs = require('fs')
const path = require('path')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

filePath = path.join(__dirname, 'test.html');

fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (!err) {
        console.log('received data: ' + data);
        dom = new JSDOM(data);
    } else {
        console.log(err);
    }
});


