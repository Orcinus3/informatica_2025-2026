<?php

require "./config/connect.php";

$username = $_POST["username"] ?? "";
$email = $_POST["email"] ?? "";
$password = $_POST["password"] ?? "";

$conn->beginTransaction();

$query1 =
    "SELECT * FROM Users WHERE username = :username AND email = :email AND password = :password";
$stmt = $conn->prepare($query1);
$stmt->bindParam(":username", $username);
$stmt->bindParam(":email", $email);
$stmt->bindParam(":password", $password);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    $conn->rollBack();
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Account already exists",
    ]);
} else {
    $query2 =
        "INSERT INTO Users(username, email, password) VALUES(:username, :email, :password)";
    $stmt = $conn->prepare($query2);
    $stmt->bindParam(":username", $username, PDO::PARAM_STR);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);
    $stmt->bindParam(":password", $password, PDO::PARAM_STR);

    $stmt->execute();

    $conn->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Account successfully created",
    ]);
}
