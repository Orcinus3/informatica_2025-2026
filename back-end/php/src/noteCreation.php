<?php

require "./config/connect.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit();
}

try {
    $data = $_POST["content"];
    $title = $_POST["title"];

    $query =
        "INSERT INTO notes (title, content, folder_id, category) VALUES (:title, :content, null, 'category')";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":content", $data);
    $stmt->bindParam(":title", $title);
    $stmt->execute();

    echo json_encode([
        "status" => "success",
        "message" => "Successfully created a new record in the Notes table",
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Couldn't create a new record, something has gone wrong",
    ]);
}

?>
