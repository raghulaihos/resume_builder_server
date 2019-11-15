const db = require('../../postgres/connection');
const fs = require('fs')
const path = require('path')
// const { JSDOM } = require('jsdom');
const Jinja = require('jinja-js');
const pdf = require('html-pdf');

const id_to_stream = (user_data, template_code) => {

    filePath = path.join(__dirname, template_code, 'template.html');
    options = { format: 'Letter' };


    fs.readFile(filePath, { encoding: 'utf-8' }, (err, html_template) => {
        if (!err) {
            console.log('received data: ' + data);
            // dom = new JSDOM(data);
            let context = {
                user_name: "RahulDamineni",
                password: "Password"
            };

            html = Jinja.render(html_template, user_data)
            return pdf.create(html, options)
        } else {
            console.log(err);
        }
    });

}

const streamer = async (req, res, next) => {

    const user_id = req.query.user_id;
    const template_code = req.query.template_code;

    db.query(`SELECT data FROM data WHERE user_id=${user_id}`)
        .then((result) => JSON.parse(result.rows[0]))
        .then((user_data) => id_to_stream(user_data, template_code))
        .then((streamPromise) => {
            streamPromise.toStream((err, stream) => {
                res.writeHead(200, {
                    "Content-Type": "application/octet-stream",
                    "Content-Disposition": "attachment; filename=" + fileName
                });
                stream.pipe(res);
            })
        })
        .catch((err) => {
            res.status(500).json({ msg: "Operation failed" });
        })

}

module.exports = {
    streamer
}