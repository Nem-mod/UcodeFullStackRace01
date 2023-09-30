USE ucode_web;

CREATE TABLE IF NOT EXISTS cards(
    card_id INT PRIMARY KEY AUTO_INCREMENT,
    card_type ENUM('attack', 'defense', 'special') NOT NULL,
    card_power INT,
    card_cost INT,
    card_name VARCHAR(30) NOT NULL,
    card_img_url TEXT
);