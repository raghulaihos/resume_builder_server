const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom');
const Jinja = require('jinja-js');

filePath = path.join(__dirname, 'test.html');

fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (!err) {
        console.log('received data: ' + data);
        dom = new JSDOM(data);
        let context = {
            user_name: "RahulDamineni",
            password: "Password"
        };
        console.log(Jinja.render(data, context))
    } else {
        console.log(err);
    }
});


