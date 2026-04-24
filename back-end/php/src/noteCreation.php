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
    $userId = $_POST["userId"];
    $category_id = $_POST["categoryId"];

    $query =
        "INSERT INTO notes (title, content, folder_id, category, user_id) VALUES (:title, :content, null, 'category', :userId)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":content", $data);
    $stmt->bindParam(":title", $title);
    $stmt->bindParam(":userId", $userId);
    $stmt->execute();



    $last_id = $conn->lastInsertId();
    $query2 = "INSERT INTO Note_Categories (category_id, note_id) VALUES (:category_id, :note_Id)";
    $stmt = $conn->prepare($query2);
    $stmt->bindParam(":category_id", $category_id);
    $stmt->bindParam(":note_id", $last_id);
    $stmt->execute();

    echo json_encode([
        "status" => "success",
        "message" => "Successfully created a new record in the Notes table",
    ]);


    //$stmt->bindParam(":", $note);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Couldn't create a new record, something has gone wrong",
    ]);
}
