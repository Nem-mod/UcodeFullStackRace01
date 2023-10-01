'use strict'

import {connect} from "../db/db.js";

// TODO: Seva i've create arrow function to create connect use it and don't forget to close connections!
export class UserModel {
    constructor(name, password, email='') {
        this.user_name = name;
        this.user_password = password;
        this.user_email = email;
    }


    findByUserName(name) {
        const connection = connect()
        connection.query('SELECT * FROM users WHERE user_name=?', name, (err, rows, fields) => {
            if (err) throw err

            this.user_id = rows[0].user_id
            this.user_name = rows[0].user_name
            this.user_password = rows[0].user_password
            this.user_email = rows[0].user_email

        })
        connection.end()
        return this
    }

    save() {
        const connection = connect()
        let user = {
            user_name: this.user_name,
            user_password: this.user_password,
            user_email: this.user_email
        }
        connection.query('INSERT INTO users SET ?', user, (err, rows, fields) => {
            if (err) throw err
            this.id = rows.insertID
        })
        connection.end()
        return true
    }

    delete(id) {
        const connection = connect()
        connection.query('DELETE FROM users WHERE user_id=?', id, (err, result) => {
            if (err) throw err
        })
        connection.end()
        return true
    }
}