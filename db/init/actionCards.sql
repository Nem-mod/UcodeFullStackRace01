USE ucode_web;

CREATE TABLE IF NOT EXISTS action_cards(
    card_id INT PRIMARY KEY AUTO_INCREMENT,
    card_name VARCHAR(30) NOT NULL,
    card_action ENUM('attack', 'heal', 'buff', 'stun'),
    card_low_power INT,
    card_mid_power INT,
    card_high_power INT,
    card_cost INT,
    card_img TEXT
);

INSERT INTO action_cards(card_name, card_action, card_low_power, card_mid_power, card_high_power, card_cost, card_img)
SELECT 'Thors Hammer', 'attack', 4, 8, 12, 2, 'a1'
UNION ALL SELECT 'Captain America\'s shield', 'buff', 3, 6, 9, 2, 'a2'
UNION ALL SELECT 'Infinity Gauntlet', 'attack', 5, 10, 15, 3, 'a3'
UNION ALL SELECT 'Iron Man\'s armour', 'buff', 4, 8, 12, 2, 'a4'
UNION ALL SELECT 'Time stone', 'heal', 4, 8, 12, 2, 'a5'
UNION ALL SELECT 'Web-shooters', 'stun', 1, 2, 3, 2, 'a6'
UNION ALL SELECT 'Ultimate nullifier', 'attack', 2, 4, 6, 1, 'a7'
UNION ALL SELECT 'Suspicious looking pot', 'heal', 5, 10, 15, 3, 'a8'
UNION ALL SELECT 'Punisher\s arsenal', 'buff', 3, 6, 9, 2, 'a9'
UNION ALL SELECT 'Wolverine\s claws', 'attack', 4, 8, 12, 2, 'a10'
WHERE NOT EXISTS(SELECT 1 FROM action_cards);