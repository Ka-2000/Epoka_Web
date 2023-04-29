<?php

try {
    $pdo = new PDO("mysql:host=127.0.0.1;dbname=epokabddreal;charset=utf8","root","");

    $req = "SELECT comId, comNom, comCP FROM commune ORDER BY comNom";

    $stmt = $pdo->prepare($req);

    $stmt->execute();

    foreach ($stmt->fetchAll() as $uneCommune) {

        $tab[] = $uneCommune;

    }

    echo (json_encode($tab));
    

} catch(Exception $e){

    die ("Gros souci : " . $e->getMessage());

}

?>