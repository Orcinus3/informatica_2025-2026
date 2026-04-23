<?php

require "./config/connect.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit();
}

$query = "SELECT * FROM Categories";
$stmt = $conn->prepare($query);
$stmt->execute();
$categories = $stmt->fetchAll();

if (!empty($categories)) {
    echo json_encode([
        "status" => "success",
        "message" => "categories successfully fetched",
        "content" => $categories,
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "couldn't fetch categories",
    ]);
}
