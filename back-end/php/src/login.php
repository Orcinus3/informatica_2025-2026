<?php

require './config/connect.php';

$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];

$query1 = 'SELECT * FROM Users WHERE username = :username AND email = :email';

$stmt = $conn->prepare($query1);

$stmt->bindParam(':username', $username);
$stmt->bindParam(':email', $email);

$stmt->execute();
$tables = $stmt->fetchAll();

if (!empty($tables)) {
    $query2 = 'INSERT INTO Users(username, email, password) VALUES(:username, :email, :password)';
    $stmt = $conn->prepare($query2);

    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);

    $stmt->execute();
    echo "<br>";
    echo "login successfull";

    header("Location: http://localhost:5173");
    header('Access-Control-Allow-Origin: http://localhost:5173/login');
    $user = $_POST['username'];
    echo ("Hello from server: $user");
} else {
    echo "Account doesn't exist.";
}
