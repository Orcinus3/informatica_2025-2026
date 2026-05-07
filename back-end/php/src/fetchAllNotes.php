<?php

require "./config/connect.php";

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
