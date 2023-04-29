<?php

try {
    $pdo = new PDO("mysql:host=127.0.0.1;dbname=epokabddreal;charset=utf8","root","", array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

    $dateDebut = $_GET['dateDebut'];
    $dateFin = $_GET['dateFin'];
    $idCommune = $_GET['idCommune'];
    $idEmploye = $_GET['idEmploye'];

    $req = "INSERT INTO mission (mission_DateDebut, mission_DateFin, mission_IdCommune, mission_IdEmploye) VALUES ( :dateDebut, :dateFin, :idCommune, :idEmploye)";

    $stmt = $pdo->prepare($req);

    $stmt->bindParam(':dateDebut', $dateDebut);

    $stmt->bindParam(':dateFin', $dateFin);

    $stmt->bindParam(':idCommune', $idCommune);

    $stmt->bindParam(':idEmploye', $idEmploye);

    $stmt->execute();

} catch(Exception $e){

    die ("Gros souci : " . $e->getMessage());

}

?>