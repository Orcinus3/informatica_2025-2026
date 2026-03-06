CREATE DATABASE progetto_fine_anno;

USE progetto_fine_anno;

SHOW TABLES;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50)
)

CREATE TABLE Folders (
    folder_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
)

CREATE TABLE Notes (
    note_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    folder_id INT,
    FOREIGN KEY (folder_id) REFERENCES Folders (folder_id)
)