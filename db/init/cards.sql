USE ucode_web;

CREATE TABLE IF NOT EXISTS cards(
    card_id INT PRIMARY KEY AUTO_INCREMENT,
    card_type ENUM('attack', 'defense', 'special') NOT NULL,
    card_power INT,
    card_cost INT,
    card_hitpoints INT,
    card_name VARCHAR(30) NOT NULL,
    card_img_url TEXT
);


INSERT INTO cards(card_type, card_power, card_cost, card_hitpoints, card_name, card_img_url)
SELECT 'defense', 5, 2, 6, 'Captain America', 'h1'
UNION ALL SELECT 'attack', 5, 2, 4, 'Hulk', 'h2'
UNION ALL SELECT 'attack', 7, 3, 5, 'Thor', 'h3'
UNION ALL SELECT 'defense', 4, 2, 5, 'Black Panther', 'h4'
UNION ALL SELECT 'attack', 4, 1, 4, 'Spider Man', 'h5'
UNION ALL SELECT 'defense', 7, 3, 7, 'Doctor Strange', 'h6'
UNION ALL SELECT 'attack', 6, 2, 6, 'Iron Man', 'h7'
UNION ALL SELECT 'attack', 8, 3, 9, 'Thanos', 'h8'
UNION ALL SELECT 'defense', 4, 1, 5, 'Scarlet Witch', 'h9'
UNION ALL SELECT 'defense', 3, 1, 4, 'Vision', 'h10'
UNION ALL SELECT 'attack', 5, 2, 5, 'Venom', 'h11'
UNION ALL SELECT 'attack', 7, 3, 7, 'Ultron', 'h12'
UNION ALL SELECT 'defense', 4, 1, 6, 'She Hulk', 'h13'
UNION ALL SELECT 'defense', 4, 2, 8, 'Ant-Man', 'h14'
UNION ALL SELECT 'attack', 4, 1, 5, 'Deathlock', 'h15'
UNION ALL SELECT 'attack', 8, 3, 9, 'Spider-Man 2099', 'h16'
WHERE NOT EXISTS (SELECT 1 FROM cards);

# INSERT INTO cards(card_type, card_power, card_cost, card_hitpoints, card_name, card_img_url)
# VALUES
#     ('defense', 5, 2, 6, 'Captain America', ''),
#     ('attack', 5, 2, 4, 'Hulk', ''),
#     ('attack', 7, 3, 5, 'Thor', ''),
#     ('defense', 4, 2, 5, 'Black Panther', ''),
#     ('attack', 4, 1, 4, 'Spider Man', ''),
#     ('defense', 7, 3, 7, 'Doctor Strange', ''),
#     ('attack', 6, 2, 6, 'Iron Man', ''),
#     ('attack', 8, 3, 9, 'Thanos', ''),
#     ('defense', 4, 1, 5, 'Scarlet Witch', ''),
#     ('defense', 3, 1, 4, 'Vision', ''),
#     ('attack', 5, 2, 5, 'Venom', ''),
#     ('attack', 7, 3, 7, 'Ultron', ''),
#     ('defense', 4, 1, 6, 'She Hulk', ''),
#     ('defense', 4, 2, 8, 'Ant-Man', ''),
#     ('attack', 4, 1, 5, 'Deathlock', ''),
#     ('attack', 8, 3, 9, 'Spider-Man 2099', '');
