const db = require('../../postgres/connection');

const tester = async (req, res, next) => {
    try {
        let result = await db.query(`SELECT data FROM data WHERE user_id=${req.query.user_id}`);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        const error = new Error('DB Error fetching equipment');
        error.statusCode = 500;
        next(err);
    }
}

const formSubmit = (req, res, next) => {

    const user_id = req.query.user_id;
    const json = req.query.payload;

    const insert_cmd = `INSERT INTO data (user_id, data) VALUES ($1, $2)`;
    const update_cmd = `UPDATE data SET data = $2 WHERE user_id = $1`
    const args = [user_id, json];  // Probably have to convert this to a string

    db.query(insert_cmd, args)
        .then(() => res.status(200).json({ msg: "Saved successfully." }))
        .catch((err) => {
            db.query(update_cmd, args)
                .then(() => {
                    res.status(200).json({ msg: "Updated successfully." })
                })
                .catch((err) => {
                    const error = new Error('Failed saving user data');
                    error.statusCode = 500;
                    throw error;
                })
        })

}

const dataFetch = (req, res, next) => {

    const user_id = req.query.user_id;
    const cmd = `SELECT data FROM data WHERE user_id=$1`
    const args = [user_id];
    const out = db.query(cmd, args, (err, result, fields) => {
        if (err) {
            err.statusCode = 500;
            throw err;
        }
        else {
            if (result.rows[0])
                usr_data = result.rows[0].data;
            else
                usr_data = {}

            res.status(200).json({ data: usr_data })
        }


    });

}


module.exports = {
    formSubmit,
    dataFetch,
    tester
}