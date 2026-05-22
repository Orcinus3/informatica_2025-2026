<?php

require "./config/connect.php";

$note_id = $_POST["id"] ?? null;

$query = "SELECT * FROM Notes WHERE note_id = :note_id";

try {
    $conn->beginTransaction();

    $stmt = $conn->prepare($query);
    $stmt->bindParam(":note_id", $note_id);
    $stmt->execute();
    $result = $stmt->fetch();

    if (!empty($result)) {
        $query = "DELETE FROM Notes WHERE note_id = :note_id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":note_id", $note_id);
        $stmt->execute();
        echo json_encode([
            "status" => "success",
            "message" => "note deleted successfully",
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            "status" => "error",
            "message" => "note not found",
        ]);
    }
} catch (Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }

    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database error occurred",
    ]);
    exit();
}
