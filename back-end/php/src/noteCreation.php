<?php

require "./config/connect.php";

try {
    $data = $_POST["content"];
    $title = $_POST["title"];
    $userId = $_POST["userId"];
    $category_ids = $_POST["categoryId"] ?? [];

    $query =
        "INSERT INTO notes (title, content, folder_id, user_id) VALUES (:title, :content, null, :userId)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":content", $data);
    $stmt->bindParam(":title", $title);
    $stmt->bindParam(":userId", $userId);
    $stmt->execute();

    $last_id = $conn->lastInsertId();

    if (!empty($category_ids)) {
        foreach ($category_ids as $category_id) {
            $query2 =
                "INSERT INTO Note_Categories (category_id, note_id) VALUES (:category_id, :note_id)";
            $stmt = $conn->prepare($query2);
            $stmt->bindParam(":category_id", $category_id);
            $stmt->bindParam(":note_id", $last_id);
            $stmt->execute();
        }
    }

    echo json_encode([
        "status" => "success",
        "message" => "Successfully created a new record in the Notes table",
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Couldn't create a new record, something has gone wrong",
        "debug" => $e->getMessage(),
    ]);
}
