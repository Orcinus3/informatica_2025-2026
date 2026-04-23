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
    content TEXT,
    folder_id INT,
    user_id INT,
    category VARCHAR(255),
    FOREIGN KEY (folder_id) REFERENCES Folders (folder_id)
)

CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
)

INSERT INTO Categories(name) VALUES
    ("Science"),
    ("Mathematics"),
    ("History"),
    ("Literature"),
    ("Physics"),
    ("Chemistry");

CREATE TABLE Note_Categories (
    category_id INT,
    note_id INT,
    FOREIGN KEY (category_id) REFERENCES Categories (category_id),
    FOREIGN KEY (note_id) REFERENCES Notes (note_id),
    PRIMARY KEY (category_id, note_id)
)

CREATE TABLE Preferences ()

CREATE TABLE Admins ()
