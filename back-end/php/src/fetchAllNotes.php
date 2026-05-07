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
            "SELECT nc.category_id, c.name FROM note_categories nc JOIN Categories c ON nc.category_id = c.category_id WHERE nc.note_id = :note_id";
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
