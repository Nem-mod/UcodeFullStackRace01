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

    static async get_all() {
        const connection = await connect()
        const cards = await connection.query("SELECT * FROM action_cards")
        let res = cards[0].map(e => {
            const min = 1, max = 100;
            const rand =Math.floor(Math.random() * (max-min) + min);
            let card_power = 0;
            if(rand < 33)
                card_power = e.card_low_power;
            else if(rand > 66)
                card_power = e.card_high_power;
            else
                card_power = e.card_mid_power;
            return {
                card_id: e.card_id,
                card_name: e.card_name,
                card_action: e.card_action,
                card_power: card_power,
                card_cost: e.card_cost,
                card_img: e.card_img
            }
        })
        return res;
    }
}