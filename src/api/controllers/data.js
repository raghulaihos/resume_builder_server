const is_auth = require('../middleware/is_auth');
const db = require('../../postgres/connection');

const formSubmit = (req, res, next) => {

    // Check if req has jwt & belongs to a valid user
    write_to_db = (user_id, json) => {
        const cmd = `INSERT INTO usr_data (user_id, data) VALUES ($1, $2)`;
        const args = [user_id, json];  // Probably have to convert this to a string
        const res = db.query(cmd, args);

        if (!res) {
            const error = new Error('Failed saving user data');
            error.statusCode = 500;
            throw error;
        }

    }

    is_auth(req, res, write_to_db);

    // Yes: write data to db, return 200

    // No: redirect to login page

}


module.exports = {
    formSubmit,
    dataFetch
}