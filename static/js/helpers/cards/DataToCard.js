import ActionCard from "./ActionCard.js";
import HeroCard from "./HeroCard.js";

export default function getCardByData(scene, owner, data) {
    if (data.hasOwnProperty('card_action'))
        return new ActionCard(scene, owner, 0, 0, '', true, false, 0, '').setCardByData(data);
    else
        return new HeroCard(scene, owner, 0, 0, '', true, false, 0, 0).setCardByData(data);
}