'use strict'

import {connect} from "../db/db.js";

export class ActionCard {
    constructor(card_name, card_action, card_low_power, card_mid_power, card_high_power, card_cost, card_img) {
        this.card_id = 0
        this.card_name = card_name
        this.card_action = card_action
        this.card_low_power = card_low_power
        this.card_mid_power = card_mid_power
        this.card_high_power = card_high_power
        this.card_cost = card_cost
        this.card_img = card_img
    }

    async get_all() {
        const connection = connect()
        let res
        await connection.query("SELECT * FROM action_cards", (err, rows) => {
            if (err) throw err
            res = rows
        })
        return res
    }
}