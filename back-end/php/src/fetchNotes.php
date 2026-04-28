<?php

require "./config/connect.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit();
}

$userId = $_POST["userId"];

$query = "SELECT note_id,title,content FROM Notes WHERE user_id = :userId";
$stmt = $conn->prepare($query);
$stmt->bindParam(":userId", $userId);
$stmt->execute();
$notes = $stmt->fetchAll();

if (!empty($notes)) {
    $categories = [];
    foreach ($notes as $note) {
        $query2 = "SELECT * FROM note_categories WHERE note_id = :note_id";
        $stmt2 = $conn->prepare($query2);
        $stmt2->bindParam(":note_id", $note["note_id"]);
        $stmt2->execute();
        $result = $stmt2->fetchAll();
        array_push($categories, $result);
    }

    echo json_encode([
        "status" => "success",
        "records" => $notes,
        "note_categories" => $categories,
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "records" => [],
        "message" => "no records",
    ]);
}
