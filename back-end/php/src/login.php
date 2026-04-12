<?php
require "./config/connect.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Qualche volta il browser menda un test con OPTIONS (da ignorare)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit();
}

$username = $_POST["username"] ?? "";
$email = $_POST["email"] ?? "";
$password = $_POST["password"] ?? "";

$query1 = "SELECT * FROM Users WHERE username = :username AND email = :email";
$stmt = $conn->prepare($query1);
$stmt->bindParam(":username", $username);
$stmt->bindParam(":email", $email);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode([
        "status" => "success",
        "message" => "Login successful",
        "username" => $user["username"],
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid username or email.",
    ]);
}
