'use strict'

import {connect} from "../db/db.js";

export class Card {
    constructor(card_type, card_power, card_cost, card_hitpoints, card_name, card_img_url) {
        this.card_id = 0
        this.card_type = card_type
        this.card_power = card_power
        this.card_cost = card_cost
        this.card_hitpoints = card_hitpoints
        this.card_name = card_name
        this.card_img_url = card_img_url
    }

    static async get_all() {
        const connection = await connect()

        const res = await connection.query("SELECT * FROM cards")
        return res[0]
    }
}