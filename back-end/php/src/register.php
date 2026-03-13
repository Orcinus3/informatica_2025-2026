<?php 

require_once 'config/connect.php';

$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];

$query1 = 'SELECT * FROM Users WHERE username = :username AND email = :email';

$stmt = $conn->prepare($query1);

$stmt->bindParam(':username', $username, PDO::PARAM_STR);
$stmt->bindParam(':email', $email, PDO::PARAM_STR);

$stmt->execute();
$tables = $stmt->fetchAll();

if (!empty($tables)) {
    echo "Account already exists.";
} else {
    $query2 = 'INSERT INTO Users(username, email, password) VALUES(:username, :email, :password)';
    $stmt = $conn->prepare($query2);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':password', $password, PDO::PARAM_STR);
    
    $stmt->execute();
}


?>