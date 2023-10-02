'use strict'

import {connect} from "../db/db.js";

// TODO: Seva i've create arrow function to create connect use it and don't forget to close connections!
export class UserModel {
    constructor(name = null, password = null, email = null) {
        this.user_name = name;
        this.user_password = password;
        this.user_email = email;
    }


    async findByUserName(name) {
        const connection = await connect()
        try {
            const query = `SELECT *
                       FROM users
                       WHERE user_name = ?`;
            const [results] = await connection.query(query, [name]);

            if (results.length === 0) {
                return null;
            } else {
                return results[0];
            }

        } catch (err) {
            console.log(err)
            await connection.end()
        }

    }

    async save() {
        const connection = await connect()
        let user = {
            user_name: this.user_name,
            user_password: this.user_password,
            user_email: this.user_email
        }
        await connection.query('INSERT INTO users SET ?', user, (err, rows, fields) => {
            if (err) throw err
            this.id = rows.insertID
        })
        await connection.end()
        return true
    }

    async delete(id) {
        const connection = await connect()
        await connection.query('DELETE FROM users WHERE user_id=?', id, (err, result) => {
            if (err) throw err
        })
        await connection.end()
        return true
    }
}
