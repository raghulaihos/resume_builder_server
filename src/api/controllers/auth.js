const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../postgres/connection');
const jwt = require('jsonwebtoken');

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('validation failed!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    bcrypt.hash(password, 12).then(hashedPw => {
        let values = [name, email, hashedPw];
        create_user(values).then(resp=>{
            res.status(200).json(resp);
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

const create_user = async (values) => {

    const text = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *'
    try {
        const res = await db.query(text, values)
        console.log(res.rows)
        return res;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        throw(err);
    }
}

const login = async (req, res, next) => {
    const email = req.body.email;
    const passsword = req.body.password;
    try {
        let response = await find_user([email, passsword]);
        res.status(200).json({ token: response.token, user_id: response.user_id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const find_user = async (values) => {
    let email = [values[0]];
    const text = `select * from users where email=$1`;
    try {
        const res = await db.query(text, email);
        if (!res) {
            const error = new Error('No user with this email exists');
            error.statusCode = 401;
            throw error;
        }
        let is_equal = await bcrypt.compare(values[1], res.rows[0].password);
        if (is_equal == false) {
            const error = new Error('wrong password!');
            error.statusCode = 401;
            throw error;
        }
        else {
            const token = jwt.sign({
                email: res.rows[0].email,
                user_id: res.rows[0].user_id
            }, 'YouCannotHackThisServer',
                { expiresIn: '1h' }
            )
            return { token: token, user_id: res.rows[0].user_id }
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        throw err;
    }
}

module.exports = {
    signup,
    login
}