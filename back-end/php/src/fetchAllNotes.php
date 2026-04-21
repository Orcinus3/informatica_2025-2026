<?php

require "./config/connect.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit();
}


$query = "SELECT note_id,title,content FROM Notes";
$stmt = $conn->prepare($query);
$stmt->execute();
$notes = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!empty($notes)) {
    echo json_encode([
        "status" => "success",
        "records" => $notes,
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "records" => [],
        "message" => "no records",
    ]);
}
