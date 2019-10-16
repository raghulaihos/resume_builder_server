const is_auth = require('../middleware/is_auth');
const db = require('../../postgres/connection');

const formSubmit = (req, res, next) => {

    const user_id = req.body.user_id;
    const json = req.body.payload;

    const cmd = `INSERT INTO data (user_id, data) VALUES ($1, $2)`;
    const args = [user_id, json];  // Probably have to convert this to a string
    const out = db.query(cmd, args);

    if (!res) {  // TODO: And other cases?
        const error = new Error('Failed saving user data');
        error.statusCode = 500;
        throw error;
    }
    else {
        res.status(200).json({ msg: "Saved successfully." })
    }

}

const dataFetch = (req, res, next) => {
    const user_id = req.body.user_id


}


module.exports = {
    formSubmit,
    // dataFetch
}