const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom');
const Jinja = require('jinja-js');
const pdf = require('html-pdf');

filePath = path.join(__dirname, 'test.html');
options = { format: 'Letter' };

fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (!err) {
        console.log('received data: ' + data);
        dom = new JSDOM(data);
        let context = {
            user_name: "RahulDamineni",
            password: "Password"
        };
        html = Jinja.render(data, context)
        pdf.create(html, options)
            .toStream((err, stream) => {
                if (err) {
                    console.log(err)
                }
                else {
                    stream.pipe(response)
                }
            })
    } else {
        console.log(err);
    }
});


