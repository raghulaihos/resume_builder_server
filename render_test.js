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
            password: "Password",
            objects: [
                {
                    name: "SW Dev",
                    desc: "Develops software"
                },
                {
                    name: "HW Dev",
                    desc: "Develops hardware"
                }, {
                    name: "UI Dev",
                    desc: "Develops UI"
                },
                {
                    name: "SOme Dev",
                    desc: "Sokething"
                }
            ]
        };
        html = Jinja.render(data, context)
        pdf.create(html, options)
            .toFile('./test.pdf', (err, stream) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(stream)
                }
            })
    } else {
        console.log(err);
    }
});


