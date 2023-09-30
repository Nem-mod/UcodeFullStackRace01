USE ucode_web;

CREATE TABLE IF NOT EXISTS users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(30) NOT NULL,
    user_password VARCHAR(20) NOT NULL,
    user_email VARCHAR(30)
);