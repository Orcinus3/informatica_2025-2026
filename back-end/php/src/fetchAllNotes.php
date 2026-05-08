<?php

require "./config/connect.php";

$query = "SELECT note_id,title,content FROM Notes";
$stmt = $conn->prepare($query);
$stmt->execute();
$notes = $stmt->fetchAll();

if (!empty($notes)) {
    $noteCategories = [];
    foreach ($notes as $note) {
        $query2 =
            "SELECT nc.category_id, c.name, n.user_id, u.username FROM note_categories nc 
            JOIN Categories c ON nc.category_id = c.category_id
            JOIN Notes n ON nc.note_id = n.note_id
            JOIN Users u ON n.user_id = u.user_id 
            WHERE nc.note_id = :note_id";
        $stmt2 = $conn->prepare($query2);
        $stmt2->bindParam(":note_id", $note["note_id"]);
        $stmt2->execute();
        $result = $stmt2->fetchAll();
        array_push($noteCategories, $result);
    }

    echo json_encode([
        "status" => "success",
        "records" => $notes,
        "note_categories" => $noteCategories,
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "records" => [],
        "message" => "no records",
    ]);
}
