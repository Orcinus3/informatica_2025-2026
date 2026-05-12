DELIMITER //

CREATE PROCEDURE CheckUserCredentials(
    IN p_username VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255)
)
BEGIN
    SELECT * FROM Users
    WHERE username = p_username
      AND email = p_email
      AND password = p_password;
END //

DELIMITER ;
