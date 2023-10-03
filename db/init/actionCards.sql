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

INSERT INTO action_cards(card_name, card_action, card_low_power, card_mid_power, card_high_power, card_cost, card_img) VALUES
    ('Thors Hammer', 'attack', 4, 8, 12, 2, ''),
    ('Captain America\'s shield', 'buff', 3, 6, 9, 2, ''),
    ('Infinity Gauntlet', 'attack', 5, 10, 15, 3, ''),
    ('Iron Man\'s armour', 'buff', 4, 8, 12, 2, ''),
    ('Time stone', 'heal', 4, 8, 12, 2, ''),
    ('Spider web', 'stun', 1, 2, 3, 2, ''),
    ('Poisoned punch', 'attack', 2, 4, 6, 1, '');
