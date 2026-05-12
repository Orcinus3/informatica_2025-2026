<?php
require "./config/connect.php";

$username = $_POST["username"] ?? "";
$email = $_POST["email"] ?? "";
$password = $_POST["password"] ?? "";

$query1 =
    "SELECT * FROM Users WHERE username = :username AND email = :email AND password = :password";
$stmt = $conn->prepare($query1);
$stmt->bindParam(":username", $username);
$stmt->bindParam(":email", $email);
$stmt->bindParam(":password", $password);
$stmt->execute();
$user = $stmt->fetch();

if ($user) {
    echo json_encode([
        "status" => "success",
        "message" => "Login successful",
        "username" => $user["username"],
        "user_id" => $user["user_id"],
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid username/email or password.",
    ]);
}
